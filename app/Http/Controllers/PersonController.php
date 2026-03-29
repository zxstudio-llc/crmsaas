<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Organization;
use App\Models\User;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\AttributeValueRepository;

class PersonController extends Controller
{
    public function __construct(protected AttributeValueRepository $attributeValueRepository) {}

    public function index(Request $request)
    {
        $persons = Person::with(['organization', 'user', 'attribute_values'])
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Persons/Index', [
            'persons' => $persons,
        ]);
    }

    public function create()
    {
        return Inertia::render('Persons/Create', [
            'organizations' => Organization::all(['id', 'name']),
            'users' => User::all(['id', 'name']),
            'attributes' => Attribute::where('entity_type', 'persons')->with('options')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'organization_id' => 'nullable|exists:organizations,id',
            'user_id' => 'required|exists:users,id',
            'emails' => 'nullable|array',
            'contact_numbers' => 'nullable|array',
        ]);

        $data['unique_id'] = 'P-' . strtoupper(\Illuminate\Support\Str::random(10));

        $person = Person::create($data);
        
        $this->attributeValueRepository->save($request->all(), $person);

        return redirect()->route('persons.index')->with('success', 'Person created.');
    }

    public function show(Person $person)
    {
        $person->load(['organization', 'user', 'attribute_values', 'leads']);
        return Inertia::render('Persons/Show', [
            'person'   => $person,
            'attributes' => Attribute::where('entity_type', 'persons')->with('options')->get(),
        ]);
    }

    public function update(Request $request, Person $person)
    {
        $data = $request->validate([
            'name' => 'required',
            'organization_id' => 'nullable|exists:organizations,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $person->update($data);
        $this->attributeValueRepository->save($request->all(), $person);

        return back()->with('success', 'Person updated.');
    }

    public function destroy(Person $person)
    {
        $person->delete();
        return redirect()->route('persons.index')->with('success', 'Person deleted.');
    }
}
