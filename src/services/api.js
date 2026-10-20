const API_URL = 'http://172.20.10.6:8000';

// 1. Поиск поездов
export async function searchTrains(fromCity, toCity, date) {
  try {
    let url = `${API_URL}/api/trains/search?from_city=${encodeURIComponent(fromCity)}&to_city=${encodeURIComponent(toCity)}`;
    if (date) {
      url += `&date=${date}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при поиске поездов:', error);
    return [];
  }
}

// 2. Создание бронирования / покупки билета
export async function createBooking(bookingData) {
  try {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    return await response.json();
  } catch (error) {
    console.error('Ошибка при бронировании:', error);
    throw error;
  }
}