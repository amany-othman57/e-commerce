import { Routes } from "@angular/router";
import { HomeComponent } from "../../components/home/home.component";
import { ProductsComponent } from "../../components/products/products.component";
import { CartComponent } from "../../components/cart/cart.component";
import { WishlistComponent } from "../../components/wishlist/wishlist.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { DetailsComponent } from "../../components/details/details.component";
import { OrdersComponent } from "../../components/orders/orders.component";
import { AllordersComponent } from "../../components/allorders/allorders.component";
import { OrderDetailsComponent } from "../../components/order-details/order-details.component";
import { GetOrderByIdResolver } from "../../core/resolvers.resolver";
import { AccountInfoComponent } from "../../components/account-info/account-info.component";
import { UpdatePasswordComponent } from "../../components/update-password/update-password.component";

export const blankRoutes: Routes = [
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Fresh Cart'},
        {path:'products',component:ProductsComponent,title:'products',pathMatch:'full'},
        {path:'cart',component:CartComponent ,title:'cart'},
        {path:'wishlist',component:WishlistComponent ,title:'wishList'},
        {path:'categories',component:CategoriesComponent ,title:'categories'},
        {path:'details/:id',component:DetailsComponent,title:'product details'},
        {path:'products/:id',component:ProductsComponent,pathMatch:'full'},
        {path:'orders/:id',component:OrdersComponent,title:'order'},
        {path:'allorders',component:AllordersComponent,title:'all Orders'},
        {path:'account',component:AccountInfoComponent,title:'Profile'},
        {path:'updatePassword',component:UpdatePasswordComponent,title:'Update Password'},
        {path:'orderdetails/:id',component:OrderDetailsComponent,title:'orderDetails',resolve:{order:GetOrderByIdResolver}}


    ]