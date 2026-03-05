/**
 * Get the host URL from the `HOST` environment variable, defaulting to `http://localhost` if not set.
 * - Used to set the base URL for relative URLs in the location mock, similar to the browser `Location` API
 */
export const getHost = () => process.env.HOST || "http://localhost";
