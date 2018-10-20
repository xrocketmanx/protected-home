import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserAuthInfo } from '../user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login({ name, password}: UserAuthInfo): void {
    this.authService.login(name, password).subscribe(() => {
      this.router.navigate(['/']);
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error;
    });
  }

}
