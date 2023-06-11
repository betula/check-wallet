import { when } from "mobx";
import { authStore } from "./auth-store";

const apiUrl = import.meta.env.VITE_API_URL;

export async function api(url: string, data?: unknown) {
  await when(() => authStore.isLoaded);
  await when(() => authStore.isSignedIn);

  const token = await authStore.getToken();
  const options: RequestInit = {
    method: 'POST',
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(apiUrl + url, options);

  if (![200, 201].includes(response.status)) {
    throw new Error('Server works incorrect');
  }

  return response.json();
}