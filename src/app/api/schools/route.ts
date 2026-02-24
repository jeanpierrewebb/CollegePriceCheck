import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'all_schools.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    const schools = JSON.parse(data);
    
    return NextResponse.json(schools);
  } catch (error) {
    console.error('Failed to load schools data:', error);
    return NextResponse.json(
      { error: 'Failed to load schools data' },
      { status: 500 }
    );
  }
}
