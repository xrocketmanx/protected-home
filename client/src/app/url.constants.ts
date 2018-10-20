import { environment } from '../environments/environment';

export const API_BASE_URL: string = environment.production ? 'localhost://3000' : 'localhost://3000';
