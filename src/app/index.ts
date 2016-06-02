// App
export * from './app.service';
export * from './app.component';

import { AppState } from './app.service';
import {AuthenticationService} from './authentication'

// Application wide providers
export const APP_PROVIDERS = [
  AppState, AuthenticationService
];
