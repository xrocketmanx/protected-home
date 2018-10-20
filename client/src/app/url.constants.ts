import { environment } from '../environments/environment';

export const API_BASE_URL: string = environment.production ? 'http://localhost:3000/api' : 'http://localhost:3000/api';
