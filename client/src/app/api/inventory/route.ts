import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/SupabaseClient';


// POST: Add a new inventory item
export async function POST(request: Request) {
    try {
        const { section, quantity, purchase_price, selling_price, expiry_date } = await request.json();

        // Insert new inventory item into the database
        const { data, error } = await supabase
            .from('Inventory')
            .insert([{ section, quantity, purchase_price, selling_price, expiry_date }]);

        if (error) throw error;
        
        return NextResponse.json({ data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET: Retrieve all inventory items
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Inventory')
            .select('*');

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update an existing inventory item by ID
export async function PUT(request: Request) {
    try {
        const { id, section, quantity, purchase_price, selling_price, expiry_date } = await request.json();

        // Update the inventory item by ID
        const { data, error } = await supabase
            .from('Inventory')
            .update({ section, quantity, purchase_price, selling_price, expiry_date })
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove an inventory item by ID
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        const { data, error } = await supabase
            .from('Inventory')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
