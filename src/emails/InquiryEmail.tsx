import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';

interface InquiryEmailProps {
  name: string;
  email: string;
  phone?: string;
  equipmentType?: string;
  requirements?: string;
  location?: string;
  budget?: string;
}

export default function InquiryEmail({
  name,
  email,
  phone,
  equipmentType,
  requirements,
  location,
  budget,
}: InquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Inquiry: IRONMARKET</Heading>
          
          <Section style={section}>
            <Text style={text}><strong>Name:</strong> {name}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={text}><strong>Phone:</strong> {phone}</Text>}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>Inquiry Details</Heading>
            <Text style={text}><strong>Type:</strong> {equipmentType || 'General Inquiry'}</Text>
            {location && <Text style={text}><strong>Location:</strong> {location}</Text>}
            {budget && <Text style={text}><strong>Budget:</strong> {budget}</Text>}
            
            {requirements && (
              <>
                <Text style={text}><strong>Message/Requirements:</strong></Text>
                <Text style={messageBox}>{requirements}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            This email was sent from your IRONMARKET lead form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#f97316', // Orange 500
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '10px',
};

const messageBox = {
  backgroundColor: '#f4f4f5',
  padding: '16px',
  borderRadius: '8px',
  color: '#3f3f46',
  fontSize: '14px',
  lineHeight: '22px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
};
