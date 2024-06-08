import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.fetchProducts();
  }

  // fetchProducts(): void {
  //   this.productService
  //     .getProLimit(this.currentPage, this.limit)
  //     .subscribe((response) => {
  //       this.products = response.products; // Giả sử API trả về dữ liệu sản phẩm trong trường `products`
  //       this.totalPages = Math.ceil(response.totalItems / this.limit); // Giả sử API trả về tổng số mục trong `totalItems`
  //     });
  // }

  // goToPage(page: number): void {
  //   this.currentPage = page;
  //   this.fetchProducts();
  // }
}
