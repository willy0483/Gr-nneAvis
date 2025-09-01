import { BACKEND_URL } from "./constants";

export const api = {
  async get(url: string, slug?: string, id?: number, accessToken?: string) {
    let endpoint = `${BACKEND_URL}/${url}`;
    if (slug) {
      endpoint = `${BACKEND_URL}/${url}/${slug}`;
    }
    if (id) {
      endpoint = `${BACKEND_URL}/${url}/${id}`;
    }
    // get data
    const res = await fetch(endpoint, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    // data to js object
    const data = await res.json();
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, body: any, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put(url: string, body: any, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  },

  async delete(url: string, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  },
};
