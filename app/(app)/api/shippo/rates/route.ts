import { NextResponse } from 'next/server';
import { getShippingRates } from '@/services/shippo';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('API received request');
    
    const { addressTo, items } = body;
    const rates = await getShippingRates(addressTo, items);
    console.log('response sent length:', rates.length);
    return NextResponse.json(rates);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}