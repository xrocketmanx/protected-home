import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthInfo } from '../user.model';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Output() userSubmit: EventEmitter<UserAuthInfo> = new EventEmitter<UserAuthInfo>();

  public authForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  public get name(): AbstractControl {
    return this.authForm.get('name');
  }

  public get password(): AbstractControl {
    return this.authForm.get('password');
  }

  public submit(): void {
    if (this.authForm.valid) {
      this.userSubmit.emit(this.authForm.value);
    }
  }

}
