// Server addresses for the Railway Connect app.
// A phone cannot reach 127.0.0.1 of the computer, so use the computer IP in the Wi-Fi network.
// Find it with the "ipconfig" command (IPv4 address) and put it below.
const HOST = '172.20.10.6';

// FastAPI: trains, seats, bookings
export const TRAINS_API_URL = `http://${HOST}:8000`;

// Django: news, login, registration
export const NEWS_API_URL = `http://${HOST}:8001`;