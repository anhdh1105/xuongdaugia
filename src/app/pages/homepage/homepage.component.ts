import { Component, inject } from '@angular/core';
import { IProduct } from '../../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, NgxPaginationModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  p: number = 1;
  error = null;
  products: IProduct[] = [];
  productService = inject(ProductService);
  constructor() {}
  ngOnInit(): void {
    this.listPro();
  }

  listPro() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
