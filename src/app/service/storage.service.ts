import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  add(key: any, data: any) {
    localStorage.setItem(key, data);
  }

  addjson(key: any, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: any) {
    return localStorage.getItem(key);
  }

  // getjson(key: string): any | null {
  //   const storedValue = localStorage.getItem(key);

  //   if (storedValue === null) {
  //     return null;
  //   }

  //   return JSON.parse(storedValue);
  // }

  getjson(key: string): any | null {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return null;
    }

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.error(`Error parsing JSON data for key "${key}":`, e);
      return null;
    }
  }

  remove(key: any) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
