// Заглушки бронирований для экрана «Менің сапарларым».
// Позже их заменят данные из базы данных.
export const UPCOMING_TRIPS = [
  {
    id: 'RC8821',
    ticketId: 'ALT-8821-XLM',
    date: '2026-11-24',
    className: 'Стандарт',
    carriage: '04',
    seats: ['12A'],
    train: {
      number: '007',
      name: 'Тұлпар-Тальго',
      from_city: 'Алматы',
      to_city: 'Астана',
      departure_time: '08:45',
      arrival_time: '21:00',
      duration_text: '12 сағ 15 мин',
    },
  },
  {
    id: 'RC9004',
    ticketId: 'ALT-9004-KRT',
    date: '2026-12-02',
    className: 'Стандарт',
    carriage: '07',
    seats: ['21C'],
    train: {
      number: '011',
      name: 'Қазақстан',
      from_city: 'Шымкент',
      to_city: 'Алматы',
      departure_time: '14:20',
      arrival_time: '23:50',
      duration_text: '9 сағ 30 мин',
    },
  },
];

export const PAST_TRIPS = [
  {
    id: 'RC7710',
    ticketId: 'ALT-7710-MNP',
    date: '2026-10-02',
    className: '1-ші',
    carriage: '02',
    seats: ['5B'],
    train: {
      number: '035',
      name: 'Нұрлы Жол',
      from_city: 'Астана',
      to_city: 'Қарағанды',
      departure_time: '10:10',
      arrival_time: '13:05',
      duration_text: '2 сағ 55 мин',
    },
  },
  {
    id: 'RC7502',
    ticketId: 'ALT-7502-BDF',
    date: '2026-09-15',
    className: 'Стандарт',
    carriage: '09',
    seats: ['18D'],
    train: {
      number: '023',
      name: 'Сарыарқа',
      from_city: 'Алматы',
      to_city: 'Шымкент',
      departure_time: '19:30',
      arrival_time: '05:10',
      duration_text: '9 сағ 40 мин',
    },
  },
];