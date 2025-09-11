import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { AuthNavComponent } from "../../components/auth-nav/auth-nav.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, AuthNavComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
