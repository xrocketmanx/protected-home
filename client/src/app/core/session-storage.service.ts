import { Injectable } from '@angular/core';
import { JsonStorage } from './json-storage.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements JsonStorage {
  private storage: Storage = window.sessionStorage;

  get(key: string): any | null {
    const item: string = this.storage.getItem(key);
    return item ? JSON.parse(item) : item;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  set(key: string, item: any): void {
    const stringifiedItem: string = JSON.stringify(item);
    this.storage.setItem(key, stringifiedItem);
  }

  constructor() { }
}
