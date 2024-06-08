import { NgFor, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SigninComponent } from './pages/signin/signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NgForOf,
    FormsModule,
    HeaderComponent,
    ProductListComponent,
    NgxPaginationModule,
    SigninComponent,
    // AdminComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
