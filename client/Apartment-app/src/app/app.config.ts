import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    
    // הוספת התמיכה בטפסים ברמת האפליקציה (חשוב מאוד לטופס הדירות)
    importProvidersFrom(FormsModule, ReactiveFormsModule)
  ]
};