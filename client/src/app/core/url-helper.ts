import { API_BASE_URL } from '../url.constants';

/*** AUTH ***/
export const getLoginUrl = (): string => {
  return `${API_BASE_URL}/users/login`;
};

export const getRegisterUrl = (): string => {
  return `${API_BASE_URL}/users/register`;
};

/*** DEVICE ***/
export const getDevicesUrl = (): string => {
  return `${API_BASE_URL}/devices/`;
};
