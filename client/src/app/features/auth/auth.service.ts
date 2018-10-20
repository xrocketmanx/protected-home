import { Injectable } from '@angular/core';
import { SessionStorageService } from '../../core/session-storage.service';
import { User } from './user.model';
import { AUTH_STORAGE_KEY } from './auth.constants';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private sessionStorageService: SessionStorageService
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

  public logout(): Observable<null> {
    this.user = null;
    this.sessionStorageService.remove(AUTH_STORAGE_KEY);
    return of(null);
  }

  public login(name: string, password: string): Observable<User> {
    // TODO: real login
    return of({ name, token: '12345', id: 1 }).pipe(
      delay(1000),
      tap((user: User) => {
        this.user = user;
        this.sessionStorageService.set(AUTH_STORAGE_KEY, user);
      })
    );
  }

  public register(name: string, password: string): Observable<User> {
    // TODO: real login
    return of({ name, token: '12345', id: 1 }).pipe(
      delay(1000),
      tap((user: User) => {
        this.user = user;
        this.sessionStorageService.set(AUTH_STORAGE_KEY, user);
      })
    );
  }
}
