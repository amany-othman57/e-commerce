import { Routes } from "@angular/router";
import { HomeComponent } from "../../components/home/home.component";
import { ProductsComponent } from "../../components/products/products.component";
import { CartComponent } from "../../components/cart/cart.component";
import { WishlistComponent } from "../../components/wishlist/wishlist.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { DetailsComponent } from "../../components/details/details.component";

export const blankRoutes: Routes = [
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Fresh Cart'},
        {path:'products',component:ProductsComponent,title:'products'},
        {path:'cart',component:CartComponent ,title:'cart'},
        {path:'wishlist',component:WishlistComponent ,title:'wishList'},
        {path:'categories',component:CategoriesComponent ,title:'categories'},
        {path:'brands',component:BrandsComponent ,title:'Brands'},
        {path:'details/:id',component:DetailsComponent,title:'product details'},

    ]