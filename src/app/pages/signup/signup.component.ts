import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  error = null;
  errorMessages: string[] = [];
  userServices = inject(UsersService);

  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    console.warn(this.signupForm.value);

    this.userServices.signup(this.signupForm.value).subscribe({
      next: () => {
        this.snackBar.open(
          'Đăng ký thành công, vui lòng đăng nhập lại !',
          'Đóng',
          {
            duration: 6000,
          }
        );
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        // alert(error.message);

        if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signup: 400 Bad Request'
        ) {
          alert('Email đã tồn tại !');
        } else if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signup: 500 Internal Server Error'
        ) {
          alert('Mật khẩu không trùng khớp, vui lòng kiểm tra lại !');
        } else if (
          error.message ==
          'Http failure response for http://localhost:8080/api/v1/auth/signup: 0 Unknown Error'
        ) {
          alert('Server đang bận, vui lòng thử lại sau !');
        }

        // this.errorMessages = error.error.messages || [
        //   'Có lỗi xảy ra. Vui lòng thử lại.',
        // ];
        // console.error(error);
        // this.snackBar.open('Đăng ký thất bại. Vui lòng thử lại.', 'Đóng', {
        //   duration: 5000,
        // });
      },
    });
  }
}
