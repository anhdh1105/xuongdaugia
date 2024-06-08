import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  error = null;
  errorMessages: string[] = [];
  userServices = inject(UsersService);

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    console.warn(this.signinForm.value);
    this.userServices.signin(this.signinForm.value).subscribe({
      next: (userData: any) => {
        localStorage.setItem('user', JSON.stringify(userData));
        this.snackBar.open('Đăng nhập thành công !', 'Đóng', {
          duration: 6000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        // alert(error.message);

        if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signin: 404 Not Found'
        ) {
          alert('Email không tồn tại, vui lòng kiểm tra lại !');
        } else if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signin: 400 Bad Request'
        ) {
          alert('Mật khẩu không chính xác, vui lòng thử lại !');
        } else if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signin: 0 Unknown Error'
        ) {
          alert('Server đang bận, vui lòng thử lại sau!');
        }
      },
    });
  }
}
