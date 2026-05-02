import { Routes } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentFormComponent } from './components/apartment-form/apartment-form.component';
import { ApartmentDetailsComponent } from './components/apartment-details/apartment-details.component';
// אם יצרת קומפוננטה נפרדת לפרטים, ייבאי אותה כאן. 
// אם לא, אפשר להשתמש זמנית בטופס או בקומפוננטה ייעודית שתצרי בהמשך.
// import { ApartmentDetailsComponent } from './components/apartment-details/apartment-details.component';

export const routes: Routes = [
  // דף הבית - מציג את רשימת הדירות
  { 
    path: 'apartments', 
    component: ApartmentListComponent 
  },

  // דף ליצירת דירה חדשה
  { 
    path: 'apartment/new', 
    component: ApartmentFormComponent 
  },

  // דף לעריכת דירה קיימת - מקבל ID כפרמטר
  { 
    path: 'apartment/edit/:id', 
    component: ApartmentFormComponent 
  },

  { 
    path: 'apartment/details/:id', 
    component: ApartmentDetailsComponent 
  },
  // ניתוב ברירת מחדל - אם הכתובת ריקה, העבר לרשימה
  { 
    path: '', 
    redirectTo: '/apartments', 
    pathMatch: 'full' 
  },

  // ניתוב לכל מקרה של כתובת לא מוכרת (Wildcard)
  { 
    path: '**', 
    redirectTo: '/apartments' 
  }


];