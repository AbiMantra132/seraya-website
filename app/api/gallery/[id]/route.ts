import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM galleries WHERE id = ${id};`;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      instagramUrl: rows[0].instagram_url
    };

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();

    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      UPDATE galleries 
      SET title = ${data.title}, 
          type = ${data.type}, 
          instagram_url = ${data.instagramUrl}, 
          thumbnail = ${data.thumbnail}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      instagramUrl: rows[0].instagram_url
    };

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error updating gallery:', error);
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM galleries WHERE id = ${id};`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 });
  }
}
