import { when } from "mobx";
import { apiConfigStore } from "./api-config-store";

const apiUrl = import.meta.env.VITE_API_URL;

export async function api(url: string, data?: unknown) {
  await when(() => apiConfigStore.tokenLoaded);

  const options: RequestInit = {
    method: 'POST',
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiConfigStore.token}`
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(apiUrl + url, options);
  return response.json();
}