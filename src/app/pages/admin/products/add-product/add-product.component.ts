import { Component, NgModule, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../services/categories.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoriesService);
  categories: any[] = [];
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  error = null;

  addProductForm: FormGroup = new FormGroup({
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

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  handleSubmit() {
    console.warn(this.addProductForm.value);

    console.log(this.addProductForm);
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: () => {
        this.snackBar.open('Thêm sản phẩm thành công !', 'Đóng', {
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
