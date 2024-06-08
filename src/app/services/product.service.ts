import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddProductForm, IProduct } from '../../interfaces/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
//class Student > const studentA = new Student -> instance
export class ProductService {
  //instance
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/api/v1/products';
  constructor() {}
  //getAllProducts()
  getAllProducts() {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  //getOne
  getOneProduct(id: any) {
    return this.http.get<IProduct[]>(`${this.apiUrl}/${id}`);
  }
  //Delete
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addProduct(data: AddProductForm) {
    return this.http.post(this.apiUrl, data);
  }

  searchProducts(query: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/search?query=${query}`);
  }

  //update

  updateProduct(id: string, data: AddProductForm) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
}
