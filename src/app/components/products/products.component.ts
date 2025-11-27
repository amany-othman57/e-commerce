import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/services/products.service';
import { CartService } from '../../core/services/services/cart.service';
import Swal from 'sweetalert2';
import { IProduct } from '../../core/interfaces/interfaces/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../core/services/services/categories.service';
import { ICategory } from '../../core/interfaces/interfaces/icategory';
import { BrandsService } from '../../core/services/services/brands.service';
import { IBrand } from '../../core/interfaces/interfaces/ibrand';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, NgxSpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private spinner: NgxSpinnerService) {}
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _BrandsService = inject(BrandsService);

  unSubProduct?: Subscription;
  unSubCart?: Subscription;
  unSubWish?: Subscription;
  unSubCatProduct?: Subscription;
  unSubGetProduct?: Subscription;
  unSubGetbrand?: Subscription;
  unSubGetspecifBrand?: Subscription;
  unSubGetAllProducts?: Subscription;
  unSubGetSpecificCat?: Subscription;

  searchValue: string = '';

  categoryData: ICategory = {} as ICategory;
  totalPages: number = 0;
  curruentPage: number = 0;
  productList: IProduct[] = [];
  categoryId: string = '';
  isempty: boolean = false;
  catRunning: boolean = false;
  brandsList: IBrand[] = [];
  specificBrandData: IBrand = {} as IBrand;
  loadProducts(page: number): void {
    if (this.categoryId) {
      this.unSubCatProduct = this._ProductsService
        .getProductOfSpecificCategory(this.categoryId, page, 20)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.data.length > 0) {
              this.totalPages = res.metadata.numberOfPages;
              this.curruentPage = res.metadata.currentPage;
              this.productList = res.data;
               window.scroll({
              top:0,
              behavior:'smooth'
            })
            } else {
              this.isempty = true;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.unSubProduct = this._ProductsService
        .getProductsAll(page, 20)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.totalPages = res.metadata.numberOfPages;
            this.curruentPage = res.metadata.currentPage;
            this.productList = res.data;
            window.scroll({
              top:0,
              behavior:'smooth'
            })
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  onSearch(): void {
    this.unSubGetProduct = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data.filter((product: IProduct) => {
          return product.title
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      },
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        if (p.get('id')) {
          this.categoryId = p.get('id')!;
          this.unSubGetSpecificCat = this._CategoriesService
            .getSpecificCategory(this.categoryId)
            .subscribe({
              next: (res) => {
                console.log(res.data);
                this.categoryData = res.data;
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.loadProducts(this.curruentPage);
    this.unSubGetbrand = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log('brands', res);
        this.brandsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  nextPage(): void {
    if (this.curruentPage < this.totalPages) {
      this.loadProducts(this.curruentPage + 1);
    }
  }
  prevPage(): void {
    if (this.curruentPage > 1) {
      this.loadProducts(this.curruentPage - 1);
    }
  }
  addToCart(id: string): void {
    this.spinner.show()
    this.unSubCart = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.hide()
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
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide()
      },
    });
  }
  addToWishList(id: string): void {
    this.spinner.show()
    this.unSubWish = this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.hide()
        if (res.status == 'success') {
          Swal.fire({
            title: 'Added to WishList!',
            text: `item has been added successfully.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide()
      },
    });
  }
  getSpecificBrandProducts(id: string): void {
    this.unSubGetspecifBrand = this._BrandsService
      .getSpecificBrand(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.specificBrandData = res.data;
          
          this.unSubGetAllProducts = this._ProductsService
            .getAllProducts()
            .subscribe({
              next: (res) => {
                console.log(res);
                this.productList = res.data.filter((product: IProduct) => {
                  return product.brand.name
                    .toLowerCase()
                    .includes(this.specificBrandData.name.toLowerCase());
                });
                if (this.productList.length > 0) {
                  this.isempty = false;
                } else {
                  this.isempty = true;
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.unSubCart) {
      this.unSubCart.unsubscribe();
    }
    if (this.unSubProduct) {
      this.unSubProduct.unsubscribe();
    }
    if (this.unSubGetProduct) {
      this.unSubGetProduct.unsubscribe();
    }
    if (this.unSubCatProduct) {
      this.unSubCatProduct.unsubscribe();
    }
    if (this.unSubWish) {
      this.unSubWish.unsubscribe();
    }
    if (this.unSubGetAllProducts) {
      this.unSubGetAllProducts.unsubscribe();
    }
    if (this.unSubGetspecifBrand) {
      this.unSubGetspecifBrand.unsubscribe();
    }
    if (this.unSubGetbrand) {
      this.unSubGetbrand.unsubscribe();
    }
    if (this.unSubGetSpecificCat) {
      this.unSubGetSpecificCat.unsubscribe();
    }
  }
}
