import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../../service/apartment';

@Component({
  selector: 'app-apartment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit {
  apartment: any = null;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private router: Router,
    private cdr: ChangeDetectorRef // פותר את בעיית רענון התצוגה
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    // שימוש בפרוצדורה GetById שכוללת JOIN [cite: 76]
    this.apartmentService.exec<any[]>('Apartments_GetById', { Id: id }).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.apartment = data[0];
          this.cdr.detectChanges(); // מאלץ את אנגולר לרנדר מיד
        }
      },
      error: (err) => console.error('שגיאה בטעינת פרטים', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/apartments']);
  }
}