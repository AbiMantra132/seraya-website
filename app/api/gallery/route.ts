import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const revalidate = 0;

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM galleries ORDER BY created_at DESC;`;
    
    const records = rows.map(r => ({
      ...r,
      createdAt: r.created_at,
      instagramUrl: r.instagram_url
    }));

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (!data.title || !data.instagramUrl || !data.thumbnail) {
      return NextResponse.json({ error: 'Title, instagramUrl, and thumbnail are required' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      INSERT INTO galleries (title, type, instagram_url, thumbnail)
      VALUES (${data.title}, ${data.type || 'Instagram'}, ${data.instagramUrl}, ${data.thumbnail})
      RETURNING *;
    `;

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      instagramUrl: rows[0].instagram_url
    };

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
  }
}
