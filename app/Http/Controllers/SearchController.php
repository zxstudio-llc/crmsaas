<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Person;
use App\Models\Organization;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = $request->query('q');

        if (!$query) {
            return response()->json([]);
        }

        $leads = Lead::where('title', 'like', "%{$query}%")->limit(5)->get(['id', 'title']);
        $persons = Person::where('name', 'like', "%{$query}%")->limit(5)->get(['id', 'name']);
        $organizations = Organization::where('name', 'like', "%{$query}%")->limit(5)->get(['id', 'name']);
        $products = Product::where('name', 'like', "%{$query}%")
            ->orWhere('sku', 'like', "%{$query}%")
            ->limit(5)->get(['id', 'name', 'sku']);

        return response()->json([
            'leads' => $leads,
            'persons' => $persons,
            'organizations' => $organizations,
            'products' => $products,
        ]);
    }
}
