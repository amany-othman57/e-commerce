import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/services/categories.service';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../core/interfaces/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: ICategory[] = [];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
