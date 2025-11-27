import { logedGuard } from './../../core/guardes/loged.guard';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/services/wishlist.service';
import { IWishlist } from '../../core/interfaces/interfaces/iwishlist';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  unSubCart?: Subscription;
  unSubGetWishlist?: Subscription;
  unSubRemovItem?: Subscription;
  listData:IWishlist[]=[];
  ngOnInit(): void {
    this.unSubGetWishlist = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.listData = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(id: string): void {
    this.unSubCart = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          Swal.fire({
            title: 'Added to Cart!',
            text: `item has been added successfully.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
          });
          this.removeItem(id)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: string): void {
    this.unSubRemovItem = this._WishlistService
      .removeItemFromWishlist(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            this.unSubGetWishlist = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.listData = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
            
           
        }},
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.unSubCart) {
      this.unSubCart.unsubscribe();
    }
    if (this.unSubGetWishlist) {
      this.unSubGetWishlist.unsubscribe();
    }
    if (this.unSubRemovItem) {
      this.unSubRemovItem.unsubscribe();
    }
  }
}
