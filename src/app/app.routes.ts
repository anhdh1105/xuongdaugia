import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientComponent } from './layouts/client/client.component';
import { SearchResultsComponent } from './components/search-result/search-result.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { EditProductsComponent } from './pages/admin/products/edit-products/edit-products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GuardComponent } from './components/guard/guard.component';
import { MemberComponent } from './pages/admin/member/member.component';
import { adminGuard } from './guards/admin.guard';
// import { ProductlistComponent } from './components/productlist/productlist.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'notAdmin',
    component: GuardComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'products',
        component: AllProductsComponent,
      },
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'products/:id',

        component: ProductdetailComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/add',
        component: AddProductComponent,
      },
      {
        path: 'products/edit/:id',
        component: EditProductsComponent,
      },
      {
        path: 'member',
        component: MemberComponent,
      },

      // {
      //   path: 'products/:id',

      //   component: ProductdetailComponent,
      // },
    ],
  },
];
