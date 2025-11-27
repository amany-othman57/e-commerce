import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch} from '@angular/common/http';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { BrowserModule } from "@angular/platform-browser";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [

    importProvidersFrom(NgxSpinnerModule,BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' ,anchorScrolling:'enabled'})
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
  ],
};
