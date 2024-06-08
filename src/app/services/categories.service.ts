import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/api/v1/categories';
  constructor() {}
  getAllCategories() {
    return this.http.get<any>(this.apiUrl);
  }
  getCateName(_id: any) {
    return this.http.get<any>(`${this.apiUrl}/${_id}`);
  }
}
