const {
  signupUrl,
  loginUrl,
  getGoogleUser,
  userProfileUrl,
  restaurantUrl,
  createRestaurant,
} = require("./utils");

// signup
export const fetchSignup = async (form) => {
  try {
    const res = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// login
export const fetchLogin = async (form) => {
  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// google auth
export const fetchGoogleUser = async () => {
  try {
    const res = await fetch(getGoogleUser, { credentials: "include" });
    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// update user profile
export const fetchUserUpdate = async (form) => {
  try {
    const res = await fetch(userProfileUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// fetch restaurant
export const fetchRestaurants = async (page, limit) => {
  try {
    const url = `${restaurantUrl}?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error getting restaurants:", error.message);
    throw error;
  }
};

// search restaurant
export const searchRestaurant = async (search, page, limit) => {
  try {
    const url = `${restaurantUrl}/search?search=${search}&page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error searching restaurants:", error.message);
    throw error;
  }
};

// create restaurant
export const createRestaurant = async (form) => {
  try {
    const res = await fetch(createRestaurant, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
