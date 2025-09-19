import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
 ngOnInit(): void {
     this._ActivatedRoute.data.subscribe({
      next:(res)=>{
        console.log(res['order'])
      }
     })
 }
    
}


