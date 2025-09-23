import { z } from 'zod';

/**
 * Product schema for data validation
 */
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  price: z.union([z.number(), z.string()]).nullable().optional(),
  originalPrice: z.union([z.number(), z.string()]).nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  mainImageUrl: z.string().nullable().optional(),
  images: z.array(z.union([
    z.string(),
    z.object({ url: z.string() })
  ])).nullable().optional(),
  badge: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

/**
 * Contact form schema
 */
export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

/**
 * Newsletter subscription schema
 */
export const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterSubscription = z.infer<typeof NewsletterSchema>;