import { NextResponse } from 'next/server';

interface Product {
  product_name: string;
  category: string;
  brand: string;
  unit: string;
  description: string;
  expiry_date: string; // Assuming this is a date in string format; adjust if necessary
}

let productCatalog: Product[] = []; // In-memory array for demonstration; replace with database logic

// Handler for adding a new product (POST)
export async function POST(request: Request) {
  try {
    const data: Product = await request.json();

    // Ensure all required fields are provided
    if (!data.product_name || !data.category || !data.brand || !data.unit || !data.description || !data.expiry_date) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the product into the database (or in-memory array in this example)
    productCatalog.push(data);

    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

// Handler for retrieving all products (GET)
export async function GET() {
  try {
    // Fetch products from the database (or in-memory array here)
    return NextResponse.json({ products: productCatalog }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving products:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
