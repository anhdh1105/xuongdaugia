import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BidService } from '../../services/bids.service';
@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css',
})
export class ProductdetailComponent {
  productId!: any;
  user: any = null;
  formBid: FormGroup = new FormGroup({
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  bidService = inject(BidService);
  starCount: number = 0;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}
  products: undefined | any;
  error = null;
  productService = inject(ProductService);
  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.paramMap.get('id');
    // console.warn(productId);
    this.productId &&
      this.productService.getOneProduct(this.productId).subscribe({
        next: (data) => {
          console.warn(data);
          this.user = localStorage.getItem('user');
          this.products = data;
          this.starCount = Math.floor(this.products.rating);
        },
        error: (error) => {
          this.error = error.message;
          console.warn(error.message);

          this.router.navigate(['/404']);
        },
      });
  }
  handleBid() {
    if (!this.products) return;
    if (!this.user) {
      alert('Dang nhap moi dau gia duoc');
      return;
    }
    if (this.formBid.valid) {
      this.bidService
        .createBid({
          product: this.productId,
          user: this.user._id,
          price: this.formBid.get('price')?.value,
          bids: this.products.bids,
        })
        .subscribe({
          next: (res: any) => {
            alert('Đấu giá thành công');
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }
}
