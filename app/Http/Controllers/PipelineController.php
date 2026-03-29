<?php

namespace App\Http\Controllers;

use App\Models\Pipeline;
use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PipelineController extends Controller
{
    public function index()
    {
        $pipelines = Pipeline::with('stages')->get();
        return Inertia::render('Pipelines/Index', [
            'pipelines' => $pipelines,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'is_default' => 'boolean',
            'stages' => 'required|array|min:1',
            'stages.*.name' => 'required|string',
        ]);

        DB::transaction(function () use ($data) {
            $pipeline = Pipeline::create([
                'name' => $data['name'],
                'is_default' => $data['is_default'] ?? false,
            ]);

            foreach ($data['stages'] as $index => $stage) {
                Stage::create([
                    'name' => $stage['name'],
                    'code' => \Illuminate\Support\Str::slug($stage['name']),
                    'probability' => $stage['probability'] ?? 100,
                    'sort_order' => $index,
                    'pipeline_id' => $pipeline->id,
                ]);
            }
        });

        return redirect()->route('pipelines.index')->with('success', 'Pipeline created.');
    }

    public function update(Request $request, Pipeline $pipeline)
    {
        $pipeline->update($request->only('name', 'is_default'));
        return back()->with('success', 'Pipeline updated.');
    }

    public function destroy(Pipeline $pipeline)
    {
        if ($pipeline->is_default) {
            return back()->with('error', 'Default pipeline cannot be deleted.');
        }
        $pipeline->delete();
        return redirect()->route('pipelines.index')->with('success', 'Pipeline deleted.');
    }
}
