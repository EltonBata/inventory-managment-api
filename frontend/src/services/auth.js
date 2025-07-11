export const authenticate = async (credentials) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "pt",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};

export const register = async (body_data) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Content": "application/json",
      },
      body: JSON.stringify(body_data),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};
