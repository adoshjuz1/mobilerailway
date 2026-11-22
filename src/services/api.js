import { TRAINS_API_URL, NEWS_API_URL } from '../config';

const REQUEST_TIMEOUT_MS = 10000;

// Query string is built by hand: URLSearchParams.toString is not reliable in React Native
const buildQuery = (params) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

// Text of the error from the server response
// FastAPI puts it in "detail" (string or list of validation errors), Django in "error"
const getErrorMessage = (data) => {
  if (typeof data?.detail === 'string') return data.detail;
  if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
  if (typeof data?.error === 'string') return data.error;
  return 'Сервер қатесі';
};

// Common request: adds a timeout and turns server and network problems into readable errors
async function request(baseUrl, path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      throw new Error(getErrorMessage(data));
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Сервер жауап бермейді. Байланысты тексеріңіз.');
    }
    if (error.message === 'Network request failed') {
      throw new Error('Серверге қосылу мүмкін болмады.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- FastAPI: trains and bookings ----------

// List of trains with carriages and seats for the chosen date (date format: YYYY-MM-DD)
export function searchTrains(fromCity, toCity, date) {
  const query = buildQuery({ from_city: fromCity, to_city: toCity, date });
  return request(TRAINS_API_URL, `/api/trains/search?${query}`);
}

// Dates when trains run on the route, with the minimum price: { "2026-10-14": 10000, ... }
export function getAvailableDates(fromCity, toCity) {
  const query = buildQuery({ from_city: fromCity, to_city: toCity });
  return request(TRAINS_API_URL, `/api/trains/available-dates?${query}`);
}

// Create an order: seats with passenger data (one passenger per seat)
export function createBooking(booking) {
  return request(TRAINS_API_URL, '/api/bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  });
}

// Orders of the user by email (the login used on the website)
export function getBookings(userEmail) {
  const query = buildQuery({ user_email: userEmail });
  return request(TRAINS_API_URL, `/api/bookings?${query}`);
}

// ---------- Django: login and registration ----------

export function loginUser(email, password) {
  return request(NEWS_API_URL, '/api/login/', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  });
}

export function registerUser({ fullName, email, password }) {
  return request(NEWS_API_URL, '/api/register/', {
    method: 'POST',
    body: JSON.stringify({ username: email, email, password, full_name: fullName }),
  });
}