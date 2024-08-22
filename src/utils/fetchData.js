// import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(path) {
    // Build request URL
    const requestUrl = `${process.env.REACT_APP_STRAPI_ENDPOINT}/api${path}`;

    // Trigger API call
    const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // cache: "force-cache",/
    });

    if (!response.ok) return null;

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json(); // Parse the JSON if the Content-Type is JSON
    } else {
        return null;
    }
}
