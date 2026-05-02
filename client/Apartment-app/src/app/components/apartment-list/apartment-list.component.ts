import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApartmentService } from '../../service/apartment';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {
  apartments: any[] = [];
  searchTerm: string = '';

  constructor(
    private apartmentService: ApartmentService, 
    private router: Router,
    private cdr: ChangeDetectorRef // הזרקה לשיפור מהירות הטעינה
  ) {}

  ngOnInit(): void {
    this.loadApartments();
  }

  loadApartments(): void {
    // קריאה לפרוצדורה GetAll כפי שנדרש בדרישות הפרויקט [cite: 79]
    this.apartmentService.exec<any[]>('Apartments_GetAll', { Search: this.searchTerm })
      .subscribe({
        next: (data) => {
          this.apartments = [...data];
          this.cdr.detectChanges(); // מאלץ עדכון תצוגה מיידי
          console.log('נתונים נטענו בהצלחה');
        },
        error: (err) => console.error('שגיאה בטעינת הנתונים', err)
      });
  }

  onSearch(): void {
    this.loadApartments();
  }

  goToAdd(): void {
    this.router.navigate(['/apartment/new']);
  }

  editApartment(id: number): void {
    this.router.navigate(['/apartment/edit', id]);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/apartment/details', id]);
  }
}