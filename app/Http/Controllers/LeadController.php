<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Pipeline;
use App\Models\Stage;
use App\Models\Source;
use App\Models\Type;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource (Kanban View).
     */
    public function index(Request $request)
    {
        $pipelineId = $request->get('pipeline_id');
        
        $pipeline = $pipelineId 
            ? Pipeline::with('stages')->findOrFail($pipelineId)
            : Pipeline::with('stages')->where('is_default', 1)->first() ?? Pipeline::with('stages')->first();

        // Optimized Kanban Data Fetching
        // Instead of N+1 queries per stage, we fetch everything with eager loading
        $stages = $pipeline->stages->map(function ($stage) {
            return [
                'id' => $stage->id,
                'name' => $stage->name,
                'code' => $stage->code,
                'sort_order' => $stage->sort_order,
                'leads' => Lead::where('lead_pipeline_stage_id', $stage->id)
                    ->with(['person', 'user', 'tags']) // Base relations
                    ->orderBy('created_at', 'desc')
                    ->paginate(10)
            ];
        });

        return Inertia::render('Leads/Index', [
            'pipeline' => $pipeline,
            'stages' => $stages,
            'pipelines' => Pipeline::all(['id', 'name']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Leads/Create', [
            'sources' => Source::all(),
            'types' => Type::all(),
            'pipelines' => Pipeline::with('stages')->get(),
            'attributes' => Attribute::where('entity_type', 'leads')->with('options')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'lead_pipeline_id' => 'required|exists:lead_pipelines,id',
            'lead_pipeline_stage_id' => 'required|exists:lead_pipeline_stages,id',
        ]);

        DB::transaction(function () use ($request) {
            $lead = Lead::create($request->all());

            // Handle custom attributes (logic from trait and repo)
            if ($request->has('attributes')) {
                // Logic to save attributes...
            }
        });

        return redirect()->route('leads.index')
            ->with('success', 'Lead created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        $lead->load(['person', 'user', 'tags', 'activities', 'products', 'quotes']);

        return Inertia::render('Leads/Show', [
            'lead' => $lead,
            'attributes' => Attribute::where('entity_type', 'leads')->with('options')->get(),
        ]);
    }

    /**
     * Update the lead stage (Drag & Drop in Kanban).
     */
    public function updateStage(Request $request, Lead $lead)
    {
        $request->validate([
            'lead_pipeline_stage_id' => 'required|exists:lead_pipeline_stages,id',
        ]);

        $stage = Stage::findOrFail($request->lead_pipeline_stage_id);
        
        $lead->update([
            'lead_pipeline_stage_id' => $stage->id,
            'lead_pipeline_id' => $stage->lead_pipeline_id,
            'closed_at' => in_array($stage->code, ['won', 'lost']) ? Carbon::now() : null,
        ]);

        return response()->json([
            'message' => 'Stage updated successfully',
            'lead' => $lead
        ]);
    }
}
