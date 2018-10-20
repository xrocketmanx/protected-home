export interface JsonStorage {
  set(key: string, item: any): void;
  get(key: string): any;
  remove(key: string): void;
}
