import { API_BASE_URL } from '../url.constants';

/*** AUTH ***/
export const getLoginUrl = (): string => {
  return `${API_BASE_URL}/login`;
};

export const getRegisterUrl = (): string => {
  return `${API_BASE_URL}/register`;
};
