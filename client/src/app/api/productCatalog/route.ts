// app/api/productCatalog/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/SupabaseClient';


export async function POST(request: Request) {
    const { brand, unit, expiry_date, image, description } = await request.json();

    const { data, error } = await supabase
        .from('productCatalog')
        .insert([{ brand, unit, expiry_date, image, description }]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product added successfully', data }, { status: 201 });
}

export async function GET(request: Request) {
    const { data, error } = await supabase
        .from('productCatalog')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: Request) {
    const { id, brand, unit, expiry_date, image, description } = await request.json();

    const { data, error } = await supabase
        .from('productCatalog')
        .update({ brand, unit, expiry_date, image, description })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product updated successfully', data }, { status: 200 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const { data, error } = await supabase
        .from('productCatalog')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product deleted successfully', data }, { status: 200 });
}
