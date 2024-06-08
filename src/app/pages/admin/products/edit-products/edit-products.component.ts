import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '../../../../../interfaces/product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CategoriesService } from '../../../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css',
})
export class EditProductsComponent implements OnInit {
  productId!: string | undefined;
  error = null;
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  productData: undefined | any;
  categories: any[] = [];
  categoryService = inject(CategoriesService);
  editProductForm: FormGroup = new FormGroup({
    // FormControl : gia tri ban dau, Validator
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true, [Validators.required]),
    discount: new FormControl(''),
    countInStock: new FormControl(''),
    rating: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productId = this.route.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.productService.getOneProduct(this.productId).subscribe({
        next: (data) => {
          this.editProductForm.patchValue(data);
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    }
  }

  handleSubmit() {
    console.warn(this.editProductForm.value);
    console.log(this.editProductForm);
    if (!this.productId) return;
    this.productService
      .updateProduct(this.productId, this.editProductForm.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Update sản phẩm thành công !', 'Đóng', {
            duration: 5000,
          });
          this.router.navigate(['/admin/products/list']);
        },
        error: (error) => {
          // show error
          this.error = error.message;
          console.error(error.message);
        },
      });
  }
}
