<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Person;
use App\Models\Lead;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EmailController extends Controller
{
    public function index(Request $request)
    {
        $emails = Email::with(['person', 'user', 'tags'])
            ->where('is_draft', 0)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Emails/Index', [
            'emails' => $emails,
        ]);
    }

    public function create()
    {
        return Inertia::render('Emails/Create', [
            'persons' => Person::all(['id', 'name', 'emails']),
            'leads'   => Lead::all(['id', 'title']),
            'tags'    => Tag::all(['id', 'name', 'color']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject'   => 'required|string|max:255',
            'from'      => 'required|array',
            'to'        => 'required|array',
            'reply'     => 'required|string',
            'person_id' => 'nullable|exists:persons,id',
            'lead_id'   => 'nullable|exists:leads,id',
        ]);

        $data['user_id'] = auth()->id();
        $data['unique_id'] = Str::uuid();
        $data['message_id'] = Str::random(20);
        $data['source'] = 'web';

        $email = Email::create($data);

        return redirect()->route('emails.index')->with('success', 'Email sent.');
    }

    public function show(Email $email)
    {
        $email->load(['person', 'user', 'attachments', 'tags', 'lead']);
        
        if (!$email->is_read) {
            $email->update(['is_read' => 1]);
        }

        return Inertia::render('Emails/Show', [
            'email' => $email,
        ]);
    }

    public function destroy(Email $email)
    {
        $email->delete();
        return redirect()->route('emails.index')->with('success', 'Email deleted.');
    }
}
