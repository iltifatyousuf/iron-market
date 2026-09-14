import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inquiries } from '@/db/schema';
import { Resend } from 'resend';
import InquiryEmail from '@/emails/InquiryEmail';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Save to Neon database
    await db.insert(inquiries).values(data);
    
    // 2. Send email notification (if configured)
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'IRONMARKET <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Lead: ${data.name} - ${data.equipmentType || 'General'}`,
        react: InquiryEmail(data),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' }, 
      { status: 500 }
    );
  }
}
