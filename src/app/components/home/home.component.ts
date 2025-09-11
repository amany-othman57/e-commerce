
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../interfaces/icategory';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit,OnDestroy  {
    productList:IProduct[]=[]
    categoriesList:ICategory[]=[]
    unSubProducts:Subscription={} as Subscription;
    unSubCategory:Subscription={} as Subscription;
    unSubCart:Subscription={} as Subscription;
    private readonly _CartService=inject(CartService)
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  upperSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
     responsive: {
      0: {
        items: 1
      }},
    nav: true,
    autoplay:true,
    autoplayTimeout:2000
  }

  middelSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    autoplaySpeed:2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

ngOnInit(): void {
   this.unSubProducts= this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.productList=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.unSubCategory= this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoriesList=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
}
addToCart(id:string):void{
this.unSubCart= this._CartService.addToCart(id).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.status=='success'){
       Swal.fire({
      title: 'Added to Cart!',
      text: `item has been added successfully.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: 'top-end'
    });
    }
  },
  error:(err)=>{
    console.log(err)
  }
})
}
ngOnDestroy(): void {
    this.unSubProducts.unsubscribe();
    this.unSubCategory.unsubscribe();
    this.unSubCart.unsubscribe();
}

}

