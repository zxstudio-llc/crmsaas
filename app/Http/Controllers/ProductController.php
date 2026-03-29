<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\AttributeValueRepository;

class ProductController extends Controller
{
    public function __construct(protected AttributeValueRepository $attributeValueRepository) {}

    public function index(Request $request)
    {
        $products = Product::with(['attribute_values', 'tags'])
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'attributes' => Attribute::where('entity_type', 'products')->with('options')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'sku'         => 'required|string|unique:products,sku',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity'    => 'required|integer|min:0',
            'price'       => 'required|numeric|min:0',
        ]);

        $product = Product::create($data);
        $this->attributeValueRepository->save($request->all(), $product);

        return redirect()->route('products.index')->with('success', 'Product created.');
    }

    public function show(Product $product)
    {
        $product->load(['attribute_values', 'tags']);
        return Inertia::render('Products/Show', [
            'product'    => $product,
            'attributes' => Attribute::where('entity_type', 'products')->with('options')->get(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'sku'         => 'required|string|unique:products,sku,' . $product->id,
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity'    => 'required|integer|min:0',
            'price'       => 'required|numeric|min:0',
        ]);

        $product->update($data);
        $this->attributeValueRepository->save($request->all(), $product);

        return back()->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted.');
    }
}
