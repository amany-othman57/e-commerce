import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guardes/auth.guard';
import { logedGuard } from './core/guardes/loged.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DetailsComponent } from './components/details/details.component';
export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Registeration',
      },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/layouts/blank/blank.routes').then((r) => r.blankRoutes),
  },
  { path: '**', component: NotfoundComponent },
];
