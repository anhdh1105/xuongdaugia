import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddUser, IUser } from '../../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  constructor() {}
  signup(data: AddUser) {
    return this.http.post('http://localhost:8080/api/v1/auth/signup', data);
  }

  signin(data: AddUser) {
    return this.http.post('http://localhost:8080/api/v1/auth/signin', data);
  }

  getAllUsers() {
    return this.http.get<IUser[]>('http://localhost:8080/api/v1/auth/users');
  }

  //Delete
  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/api/v1/auth/users/${id}`);
  }
}
