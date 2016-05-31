// App
export * from './app.service';
export * from './app.component';

import { AppState } from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];
