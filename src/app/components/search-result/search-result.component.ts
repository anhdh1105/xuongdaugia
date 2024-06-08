import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, NgClass],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultsComponent implements OnInit {
  products: IProduct[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this.productService.searchProducts(this.query).subscribe((products) => {
          this.products = products;
          console.warn(products);
        });
      }
    });
  }
}
