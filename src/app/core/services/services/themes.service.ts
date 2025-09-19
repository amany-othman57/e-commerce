    // theme.service.ts
    import { Injectable, signal, effect } from '@angular/core';
    import { isPlatformBrowser } from '@angular/common';
    import { PLATFORM_ID, Inject } from '@angular/core';

    export enum AppTheme {
      LIGHT = 'light',
      DARK = 'dark',
    }

    const LS_THEME = 'theme';

    @Injectable({
      providedIn: 'root',
    })
    export class ThemeService {
      readonly currentTheme = signal<AppTheme | undefined>(undefined);

      constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
          // Initialize theme from localStorage on the client-side
          const storedTheme = localStorage.getItem(LS_THEME);
          if (storedTheme === AppTheme.DARK) {
            this.currentTheme.set(AppTheme.DARK);
          } else if (storedTheme === AppTheme.LIGHT) {
            this.currentTheme.set(AppTheme.LIGHT);
          } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentTheme.set(AppTheme.DARK);
          } else {
            this.currentTheme.set(AppTheme.LIGHT);
          }

          // Update localStorage and apply/remove 'dark' class when theme changes
          effect(() => {
            const theme = this.currentTheme();
            if (theme === AppTheme.DARK) {
              document.documentElement.classList.add('dark');
              localStorage.setItem(LS_THEME, AppTheme.DARK);
            } else if (theme === AppTheme.LIGHT) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem(LS_THEME, AppTheme.LIGHT);
            } else {
              // Handle 'device' theme or default behavior
              document.documentElement.classList.remove('dark');
              localStorage.removeItem(LS_THEME);
            }
          });
        }
      }

      toggleTheme(): void {
        this.currentTheme.update((current) =>
          current === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK
        );
      }
    }