import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-blank-nav',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.scss',
})
export class BlankNavComponent {
  isMenuOpen = false;
isUserMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  signOut(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('userToken');
      this._Router.navigate(['/auth/login']);
    }
  }

  
}
