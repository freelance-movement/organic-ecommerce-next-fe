import { logger } from "@/lib/error-utils";

/**
 * Type for API response
 */
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

/**
 * Fetch options with cache control
 */
type FetchOptions = RequestInit & {
  /**
   * Next.js cache and revalidation options
   */
  next?: NextFetchRequestConfig;
};

/**
 * Fetches data from an API endpoint with proper error handling
 */
export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    logger.error(error, `API fetch: ${url}`);
    return { data: null, error: error instanceof Error ? error.message : "Failed to fetch data" };
  }
}

/**
 * Server action wrapper for making POST requests to API
 */
export async function postToApi<T, D = any>(
  url: string,
  data: D,
  options: Omit<FetchOptions, "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}