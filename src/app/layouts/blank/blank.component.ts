import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { BlankNavComponent } from "../../components/blank-nav/blank-nav.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, BlankNavComponent, FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
