// заглушка
export const USE_MOCK_TRAINS = true;

const MOCK_TRAINS = [
  { id: 1, number: '007', name: 'Тұлпар-Тальго', category: 'Express', min_price: 12450, departure_time: '06:40', arrival_time: '19:10', duration_text: '12 сағ 30 мин' },
  { id: 2, number: '011', name: 'Қазақстан', category: 'Express', min_price: 15900, departure_time: '09:15', arrival_time: '20:25', duration_text: '11 сағ 10 мин' },
  { id: 3, number: '023', name: 'Сарыарқа', category: 'Regional', min_price: 8700, departure_time: '13:05', arrival_time: '02:35', duration_text: '13 сағ 30 мин' },
  { id: 4, number: '035', name: 'Нұрлы Жол', category: 'Express', min_price: 17800, departure_time: '18:20', arrival_time: '05:00', duration_text: '10 сағ 40 мин' },
  { id: 5, number: '047', name: 'Жетісу', category: 'Regional', min_price: 7400, departure_time: '22:10', arrival_time: '11:45', duration_text: '13 сағ 35 мин' },
];

// Подставляем города из поиска, чтобы заглушки выглядели как реальный результат
export const getMockTrains = (fromCity, toCity) =>
  MOCK_TRAINS.map((train) => ({ ...train, from_city: fromCity, to_city: toCity }));