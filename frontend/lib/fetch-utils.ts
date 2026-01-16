import { apiBaseUrl } from "~/lib/constants";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface UseApiOptions {
  endpoint: string;
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
}

export const fetchData = async <T>({
  endpoint,
  method = "GET",
  body,
  headers = {},
}: UseApiOptions): Promise<T> => {
  try {
    const base = typeof window !== "undefined" ? "/api" : apiBaseUrl;
    const url = `${base}${endpoint}`;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
    };

    if (method !== "GET" && body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
