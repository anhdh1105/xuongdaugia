import { Component, inject } from '@angular/core';
import { IUser } from '../../../../interfaces/users';
import { UsersService } from '../../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  p: number = 1;
  userMessage: undefined | string;
  error = null;

  users: IUser[] = [];

  listUser: IUser[] = [];
  productService = inject(UsersService);

  constructor() {}
  ngOnInit(): void {
    //call api
    this.list();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure to delete this user?') === true) {
      this.productService.deleteUser(id).subscribe(
        (data) => {
          if (data) {
            this.userMessage = 'Xoa thanh cong !';
            this.list();
          }
        },
        (error) => {
          this.error = error.message;
        }
      );
    }
    setTimeout(() => {
      this.userMessage = undefined;
    }, 7000);
  }

  list() {
    this.productService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
