import { ACCOUNT_EMAIL, ACCOUNT_ID, API_HOST, API_TOKEN } from "./constants.js";

if (!globalThis.fetch) {
  console.warn("\nIMPORTANT: Your Node.js version doesn't have native fetch support and may not be supported in the future. Please update to v18 or later.\n")
  // Advise what to do if running in GitHub Actions
  if (process.env.GITHUB_WORKSPACE) console.warn("Since you're running in GitHub Actions, you should update your Actions workflow configuration to use Node v18 or higher.") 
  // Import node-fetch since there's no native fetch in this environment
  globalThis.fetch = (await import("node-fetch")).default;
}

/**
 * Fires request to the specified URL.
 * @param {string} url The URL to which the request will be fired.
 * @param {RequestInit} options The options to be passed to `fetch`.
 * @returns {Promise}
 */
const request = async (url, options) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      "X-Auth-Email": ACCOUNT_EMAIL,
      "X-Auth-Key": API_TOKEN,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  console.log(`HTTP request succeeded: ${data.success}`);

  return data;
};

/**
 * Fires request to the Zero Trust gateway.
 * @param {string} path The path which will be appended to the request URL.
 * @param {RequestInit} options The options to be passed to `fetch`.
 * @returns {Promise}
 */
export const requestGateway = (path, options) =>
  request(`${API_HOST}/accounts/${ACCOUNT_ID}/gateway${path}`, options);
