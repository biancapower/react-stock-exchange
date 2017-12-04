import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
});

export function loadQuoteForStock(symbol) {
  return api.get(`/stock/${symbol}/quote`).then(res => res.data);
}

// new function here to add logo
// will need to do something re export
