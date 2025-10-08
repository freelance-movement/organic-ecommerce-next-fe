'use server';

import { z } from 'zod';
import { logger } from '@/lib/error-utils';
import { NewsletterSchema } from '@/lib/validations';

/**
 * Customer inquiry data structure for newsletter subscription
 */
const CustomerInquiryData = z.object({
  type: z.literal('subscription'),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().optional(),
});

/**
 * Server action to handle newsletter subscription
 */
export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Extract email from form data
    const email = formData.get('email')?.toString();
    
    if (!email) {
      return { success: false, error: 'Email is required' };
    }
    
    // Validate with Zod schema
    const validated = NewsletterSchema.safeParse({ email });
    
    if (!validated.success) {
      return { 
        success: false, 
        error: validated.error.errors[0]?.message || 'Invalid email address' 
      };
    }
    
    // Prepare customer inquiry data
    const inquiryData = {
      type: 'subscription' as const,
      email: validated.data.email,
      subject: 'Newsletter Subscription',
      message: 'User has subscribed to the newsletter'
    };
    
    // Call customer inquiry API
    const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:3000';
    const apiUrl = `${backendOrigin}/api/v1/customer-inquiries`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error ${response.status}`;
      logger.error(`API call failed: ${errorMessage}`);
      return { 
        success: false, 
        error: 'Failed to process subscription. Please try again.' 
      };
    }
    
    const result = await response.json();
    logger.info(`Newsletter subscription successful for: ${email}`, result);
    
    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    logger.error(error, 'Newsletter subscription');
    return { 
      success: false, 
      error: 'An error occurred while subscribing. Please try again.' 
    };
  }
}