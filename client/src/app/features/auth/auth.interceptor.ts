import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: User = this.authService.getUser();

    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${user.token}`
        }
      });
    }

    return next.handle(request);
  }

}
