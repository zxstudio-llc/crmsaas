<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use App\Models\Person;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $activities = Activity::with(['user', 'persons', 'leads'])
            ->orderBy('schedule_from', 'desc')
            ->paginate(15);

        return Inertia::render('Activities/Index', [
            'activities' => $activities,
        ]);
    }

    public function create()
    {
        return Inertia::render('Activities/Create', [
            'users'   => User::all(['id', 'name']),
            'persons' => Person::all(['id', 'name']),
            'leads'   => Lead::all(['id', 'title']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'type'          => 'required|string',
            'schedule_to'   => 'nullable|date',
            'schedule_from' => 'required|date',
            'user_id'       => 'required|exists:users,id',
            'is_done'       => 'nullable|boolean',
        ]);

        DB::transaction(function () use ($request, $data) {
            $activity = Activity::create($data);

            if ($request->has('person_ids')) {
                $activity->persons()->attach($request->person_ids);
            }

            if ($request->has('lead_ids')) {
                $activity->leads()->attach($request->lead_ids);
            }
        });

        return redirect()->route('activities.index')->with('success', 'Activity created.');
    }

    public function show(Activity $activity)
    {
        $activity->load(['user', 'persons', 'leads', 'files']);
        return Inertia::render('Activities/Show', [
            'activity' => $activity,
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'type'          => 'required|string',
            'schedule_to'   => 'nullable|date',
            'schedule_from' => 'required|date',
        ]);

        $activity->update($data);

        return back()->with('success', 'Activity updated.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();
        return redirect()->route('activities.index')->with('success', 'Activity deleted.');
    }
}
