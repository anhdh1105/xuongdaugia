import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../../services/categories.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, RouterLink, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  p: number = 1;
  productMessage: undefined | string;
  isHidden: boolean = false;
  error = null;

  products: IProduct[] = [];

  listProduct: IProduct[] = [];
  productService = inject(ProductService);
  categoryService = inject(CategoriesService);

  constructor() {}
  filterValue: string = '';
  ngOnInit(): void {
    this.listProduct = this.products;
    //call api
    this.list();
  }

  changeImage() {
    this.isHidden = !this.isHidden;
  }

  ngDoCheck() {
    console.log('products', this.products);
  }

  filter() {
    this.products = this.listProduct.filter((p) =>
      p.name.toLowerCase().includes(this.filterValue.trim().toLowerCase())
    );
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?') === true) {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          if (data) {
            this.productMessage = 'Xoa thanh cong san pham';
            this.list();
          }
        },
        (error) => {
          this.error = error.message;
        }
      );
    }
    setTimeout(() => {
      this.productMessage = undefined;
    }, 7000);
  }

  list() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.getProductCategory();
        this.products = data;
        // console.warn(this.getProductCategory());
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  getProductCategory() {
    this.products.forEach((product) => {
      this.categoryService.getCateName(product.category).subscribe({
        next: (category) => {
          product.categoryName = category.name;
        },
      });
    });
  }
}
