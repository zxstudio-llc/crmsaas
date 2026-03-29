<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\WarehouseLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::with('locations')->get();
        return Inertia::render('Warehouses/Index', [
            'warehouses' => $warehouses,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_address' => 'nullable|array',
            'status' => 'boolean',
        ]);

        Warehouse::create($data);
        return redirect()->route('warehouses.index')->with('success', 'Warehouse created.');
    }

    public function update(Request $request, Warehouse $warehouse)
    {
        $warehouse->update($request->all());
        return back()->with('success', 'Warehouse updated.');
    }

    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();
        return redirect()->route('warehouses.index')->with('success', 'Warehouse deleted.');
    }
}