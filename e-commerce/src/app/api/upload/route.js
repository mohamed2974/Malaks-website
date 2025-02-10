import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const blob = await put(filename, request.body, {
        access: 'public',
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN  // Hier den Token einfügen
    });

    return NextResponse.json(blob);
}
