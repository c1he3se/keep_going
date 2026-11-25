import { api } from './client.js';

export function fetchCategories() {
  return api('/api/categories');
}

export function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api('/api/products' + (query ? `?${query}` : ''));
}