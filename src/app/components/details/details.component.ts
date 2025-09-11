import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IDetails } from '../../interfaces/idetails';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
Slider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoplay:true,
    autoplayTimeout:2000
  }


private readonly _ProductsService=inject(ProductsService)
private readonly _ActivatedRoute=inject(ActivatedRoute)
productId:string|null=''
productDetails:IDetails={} as IDetails
unSubSpecificProduct:Subscription={} as Subscription
ngOnInit():void{
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
console.log(p.get('id'))
this.productId=p.get('id')

    },
    error:(err)=>{
      console.log(err)
    }
  })
  if(this.productId){
this.unSubSpecificProduct= this._ProductsService.getSpecificProduct(this.productId).subscribe({
    next:(res)=>{
      console.log(res)
      this.productDetails=res.data
      console.log(this.productDetails)
    },
    error:(err)=>{
      console.log(err)
    }
   })

  }
}
ngOnDestroy(): void {
    this.unSubSpecificProduct.unsubscribe()
}
}
