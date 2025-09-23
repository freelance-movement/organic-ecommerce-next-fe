import { fetchApi } from "@/lib/api";
import { ProductSchema } from "@/lib/validations";
import { logger } from "@/lib/error-utils";
import { z } from "zod";

/**
 * Response schema for products API
 */
const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema).optional(),
  product: ProductSchema.optional(),
  total: z.number().optional(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    count: z.number().optional(),
  })).optional(),
});

type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

/**
 * Base URL for API calls - using relative paths to leverage Next.js rewrites
 */
const API_BASE_URL = '/api';

/**
 * Get featured products with caching
 */
export async function getFeaturedProducts() {
  try {
    const { data, error } = await fetchApi<ProductsResponse>(
      `${API_BASE_URL}/api/v1/products/featured`,
      { 
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (error || !data) {
      throw new Error(error || "Failed to fetch featured products");
    }

    // Validate response with Zod
    const validated = ProductsResponseSchema.safeParse(data);
    if (!validated.success) {
      throw new Error("Invalid product data format");
    }

    return { products: validated.data.products || [], error: null };
  } catch (error) {
    logger.error(error, "getFeaturedProducts");
    return { products: [], error: "Failed to load featured products. Please try again later." };
  }
}

/**
 * Get product details by ID or slug
 */
export async function getProductById(id: string) {
  try {
    const { data, error } = await fetchApi<ProductsResponse>(
      `${API_BASE_URL}/api/v1/products/${id}`,
      { 
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (error || !data) {
      throw new Error(error || `Failed to fetch product with ID: ${id}`);
    }

    // Validate response with Zod
    const validated = ProductsResponseSchema.safeParse(data);
    if (!validated.success || !validated.data.product) {
      throw new Error("Invalid product data format");
    }

    return { product: validated.data.product, error: null };
  } catch (error) {
    logger.error(error, `getProductById: ${id}`);
    return { product: null, error: "Failed to load product details. Please try again later." };
  }
}

/**
 * Get product categories
 */
export async function getProductCategories() {
  try {
    const { data, error } = await fetchApi<ProductsResponse>(
      `${API_BASE_URL}/api/v1/products/categories`,
      { 
        next: { revalidate: 86400 } // Cache for 24 hours
      }
    );

    if (error || !data) {
      throw new Error(error || "Failed to fetch product categories");
    }

    // Validate response with Zod
    const validated = ProductsResponseSchema.safeParse(data);
    if (!validated.success) {
      throw new Error("Invalid category data format");
    }

    return { categories: validated.data.categories || [], error: null };
  } catch (error) {
    logger.error(error, "getProductCategories");
    return { categories: [], error: "Failed to load categories. Please try again later." };
  }
}