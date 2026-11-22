import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  provideRouter
} from '@angular/router';

import { routes } from './app.routes';

import {
  conToken,
  alFallar
} from './sesion/interceptores';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        conToken,
        alFallar
      ])
    )
  ]
};