import axios, { AxiosRequestConfig } from "axios";

export async function request<T>(
  url: string,
  options: AxiosRequestConfig = { method: "get" },
): Promise<T> {
  try {
    const opts = { ...options, url };
    if (opts.params) {
      opts.params = { ...opts.params, format: "json" };
    }
    const response = await axios(opts);

    if (response.status <= 300) {
      return response.data as T;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
