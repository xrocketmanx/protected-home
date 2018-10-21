import { Injectable } from '@angular/core';
import { SessionStorageService } from '../../core/session-storage.service';
import { User } from './user.model';
import { AUTH_STORAGE_KEY } from './auth.constants';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { getLoginUrl, getRegisterUrl } from '../../core/url-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private sessionStorageService: SessionStorageService,
    private http: HttpClient
  ) { }

  private user: User;

  public isLoggedIn(): boolean {
    const user: User = this.getUser();
    return !!user;
  }

  public getUser(): User {
    if (!this.user) {
      this.user = this.sessionStorageService.get(AUTH_STORAGE_KEY);
    }
    return this.user;
  }

  public logout(): Observable<void> {
    this.user = null;
    this.sessionStorageService.remove(AUTH_STORAGE_KEY);
    return of(null);
  }

  public login(name: string, password: string): Observable<User> {
    const url: string = getLoginUrl();

    return this.http.post(url, { user: { name, password } }).pipe(
      tap((user: User) => {
        this.user = user;
        this.sessionStorageService.set(AUTH_STORAGE_KEY, user);
      })
    );
  }

  public register(name: string, password: string): Observable<User> {
    const url: string = getRegisterUrl();

    return this.http.post(url, { user: { name, password } }).pipe(
      tap((user: User) => {
        this.user = user;
        this.sessionStorageService.set(AUTH_STORAGE_KEY, user);
      })
    );
  }
}
