import { environment } from '../environments/environment';

export const BASE_URL: string = environment.production ? 'http://localhost:3000' : 'http://localhost:3000';
export const API_BASE_URL: string = `${BASE_URL}/api`;
export const SOCKET_URL: string = BASE_URL.replace(/^http/, 'ws');
