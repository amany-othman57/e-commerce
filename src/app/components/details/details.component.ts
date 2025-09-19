import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDetails } from '../../core/interfaces/interfaces/idetails';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/services/products.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
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
    autoplay: true,
    autoplayTimeout: 2000,
  };

  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  productId: string | null = '';
  src: string = '';
  productDetails: IDetails = {} as IDetails;
  unSubSpecificProduct?: Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        this.productId = p.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
    if (this.productId) {
      this.unSubSpecificProduct = this._ProductsService
        .getSpecificProduct(this.productId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.productDetails = res.data;
            console.log(this.productDetails);
            this.src = this.productDetails.imageCover;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  imageSrc(e: Event) {
    const img = e.target as HTMLImageElement;
    console.log(img.src);
    this.src = img.src;
  }
  ngOnDestroy(): void {
    if (this.unSubSpecificProduct) {
      this.unSubSpecificProduct.unsubscribe();
    }
  }
}
