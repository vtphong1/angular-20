import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  behavior = new BehaviorSubject<any>(null);

  getItem(key: string): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, value);
    document.cookie=`token=${value}`
  }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, val] = cookie.split('=');
      if (key === name) return val;
    }
    return null;
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
    this.deleteCookie(key);
  }

  clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }
}
