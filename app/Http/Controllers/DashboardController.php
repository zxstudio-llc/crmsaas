<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Person;
use App\Models\Organization;
use App\Models\Quote;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_leads' => Lead::count(),
                'won_leads' => Lead::whereHas('stage', fn($q) => $q->where('code', 'won'))->count(),
                'total_revenue' => Quote::sum('grand_total'),
                'total_customers' => Person::count(),
            ],
            'recent_leads' => Lead::with('person', 'stage')->latest()->limit(5)->get(),
            'revenue_over_time' => Quote::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('SUM(grand_total) as total')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get(),
        ]);
    }
}