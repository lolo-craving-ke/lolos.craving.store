import { storeConfig } from './config';
export function money(value: number) {
  return `${storeConfig.currency} ${value.toLocaleString('en-KE')}`;
}
