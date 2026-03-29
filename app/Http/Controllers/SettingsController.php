<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Workflow;
use App\Models\Tag;
use App\Models\Source;
use App\Models\Type;
use App\Models\Pipeline;
use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index', [
            'attributes' => Attribute::with('options')->get(),
            'workflows'  => Workflow::all(),
            'tags'       => Tag::all(),
            'pipelines'  => Pipeline::with('stages')->get(),
            'sources'    => Source::all(),
            'types'      => Type::all(),
        ]);
    }

    public function storeAttribute(Request $request)
    {
        $data = $request->validate([
            'code'        => 'required|unique:attributes,code',
            'name'        => 'required',
            'type'        => 'required',
            'entity_type' => 'required',
        ]);

        Attribute::create($data);
        return back()->with('success', 'Attribute created.');
    }

    public function storeWorkflow(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required',
            'event'      => 'required',
            'actions'    => 'required|array',
            'conditions' => 'nullable|array',
        ]);

        Workflow::create($data);
        return back()->with('success', 'Workflow created.');
    }
}
