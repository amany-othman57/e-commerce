import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/services/categories.service';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../core/interfaces/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit,OnDestroy {
  unSubGetAllCat?:Subscription
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: ICategory[] = [];
  ngOnInit(): void {
  this.unSubGetAllCat=  this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
      if(this.unSubGetAllCat){
        this.unSubGetAllCat.unsubscribe()
      }
  }
}
