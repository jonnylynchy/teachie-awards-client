export const ACCESS_TOKEN = 'accessToken';
export const PROD_API_URL = 'https://api.teachieawards.com/api';
export const DEV_API_URL = '/api';
export const BASE_API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;
