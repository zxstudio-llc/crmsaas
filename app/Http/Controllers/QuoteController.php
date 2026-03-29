<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\QuoteItem;
use App\Models\Person;
use App\Models\User;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\AttributeValueRepository;
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller
{
    public function __construct(protected AttributeValueRepository $attributeValueRepository) {}

    public function index(Request $request)
    {
        $quotes = Quote::with(['person', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Quotes/Index', [
            'quotes' => $quotes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Quotes/Create', [
            'persons'    => Person::all(['id', 'name']),
            'users'      => User::all(['id', 'name']),
            'products'   => Product::all(['id', 'name', 'sku', 'price']),
            'attributes' => Attribute::where('entity_type', 'quotes')->with('options')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject'         => 'required|string|max:255',
            'person_id'       => 'required|exists:persons,id',
            'user_id'         => 'required|exists:users,id',
            'items'           => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $quote = Quote::create($request->all());

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                QuoteItem::create([
                    'quote_id'   => $quote->id,
                    'product_id' => $product->id,
                    'name'       => $product->name,
                    'sku'        => $product->sku,
                    'price'      => $product->price,
                    'quantity'   => $item['quantity'],
                    'total'      => $product->price * $item['quantity'],
                ]);
            }

            $this->attributeValueRepository->save($request->all(), $quote);
        });

        return redirect()->route('quotes.index')->with('success', 'Quote created.');
    }

    public function show(Quote $quote)
    {
        $quote->load(['person', 'user', 'items', 'attribute_values']);
        return Inertia::render('Quotes/Show', [
            'quote'      => $quote,
            'attributes' => Attribute::where('entity_type', 'quotes')->with('options')->get(),
        ]);
    }

    public function update(Request $request, Quote $quote)
    {
        // Update logic for items and attributes...
        $quote->update($request->all());
        $this->attributeValueRepository->save($request->all(), $quote);

        return back()->with('success', 'Quote updated.');
    }

    public function destroy(Quote $quote)
    {
        $quote->delete();
        return redirect()->route('quotes.index')->with('success', 'Quote deleted.');
    }
}
