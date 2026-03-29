<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\AttributeValueRepository;

class OrganizationController extends Controller
{
    public function __construct(protected AttributeValueRepository $attributeValueRepository) {}

    public function index(Request $request)
    {
        $organizations = Organization::with(['user', 'attribute_values'])
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('Organizations/Index', [
            'organizations' => $organizations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Organizations/Create', [
            'users' => User::all(['id', 'name']),
            'attributes' => Attribute::where('entity_type', 'organizations')->with('options')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'address' => 'nullable|string',
        ]);

        $organization = Organization::create($data);
        $this->attributeValueRepository->save($request->all(), $organization);

        return redirect()->route('organizations.index')->with('success', 'Organization created.');
    }

    public function show(Organization $organization)
    {
        $organization->load(['user', 'attribute_values', 'persons']);
        return Inertia::render('Organizations/Show', [
            'organization'   => $organization,
            'attributes' => Attribute::where('entity_type', 'organizations')->with('options')->get(),
        ]);
    }

    public function update(Request $request, Organization $organization)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'address' => 'nullable|string',
        ]);

        $organization->update($data);
        $this->attributeValueRepository->save($request->all(), $organization);

        return back()->with('success', 'Organization updated.');
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();
        return redirect()->route('organizations.index')->with('success', 'Organization deleted.');
    }
}
