'use server';

import { z } from 'zod';
import { logger } from '@/lib/error-utils';
import { NewsletterSchema } from '@/lib/validations';

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
    
    // In a real application, you would save to a database
    // and potentially call an email service API
    // await db.insert(newsletterTable).values({ email, createdAt: new Date() });
    
    // Simulate a successful API call
    logger.info(`Newsletter subscription for: ${email}`);
    
    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    logger.error(error, 'Newsletter subscription');
    return { 
      success: false, 
      error: 'An error occurred while subscribing. Please try again.' 
    };
  }
}