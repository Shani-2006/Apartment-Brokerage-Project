import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../../service/apartment';

@Component({
  selector: 'app-apartment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss']
})
export class ApartmentFormComponent implements OnInit {
  apartmentForm!: FormGroup;
  isEditMode = false;
  apartmentId?: number;

  // רשימת ערים ידנית (כפי שביקשת, ללא טבלה ב-DB)
  cities = ['ירושלים', 'תל אביב', 'חיפה', 'רחובות', 'פתח תקווה', 'בני ברק', 'אשדוד'];
  
  // רשימות שיגיעו מה-SSMS
  agents: any[] = [];
  statuses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // 1. טעינת נתונים ראשוניים עבור תיבות הבחירה (Select)
    this.loadMetadata();

    // 2. בדיקה האם הגענו לצורך עריכה (לפי ה-ID בכתובת)
    this.apartmentId = Number(this.route.snapshot.params['id']);
    if (this.apartmentId) {
      this.isEditMode = true;
      this.loadApartmentData(this.apartmentId);
    }
  }

  private initForm(): void {
    // שמות השדות כאן תואמים בדיוק לפרמטרים בפרוצדורות ה-SQL שלך
    this.apartmentForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', Validators.required],
      Price: [0, [Validators.required, Validators.min(1)]],
      Rooms: [1, [Validators.required, Validators.min(1)]],
      City: ['', Validators.required],
      Address: ['', Validators.required],
      StatusId: ['', Validators.required],
      AgentId: ['', Validators.required]
    });
  }

  loadMetadata(): void {
    // הבאת סוכנים (פרוצדורה Agents_GetAll)
    this.apartmentService.exec<any[]>('Agents_GetAll', {}).subscribe({
      next: (data) => this.agents = data,
      error: (err) => console.error('שגיאה בטעינת סוכנים', err)
    });

    // הבאת סטטוסים (פרוצדורה Statuses_GetAll)
    this.apartmentService.exec<any[]>('Statuses_GetAll', {}).subscribe({
      next: (data) => this.statuses = data,
      error: (err) => console.error('שגיאה בטעינת סטטוסים', err)
    });
  }

  loadApartmentData(id: number): void {
    // הבאת נתוני דירה ספציפית לעריכה
    this.apartmentService.exec<any[]>('Apartments_GetById', { Id: id }).subscribe(data => {
      if (data && data.length > 0) {
        this.apartmentForm.patchValue(data[0]);
      }
    });
  }

  onSubmit(): void {
    if (this.apartmentForm.valid) {
      const apartmentData = this.apartmentForm.value;
      // בחירת הפרוצדורה המתאימה לפי המצב
      const procedureName = this.isEditMode ? 'Apartments_Update' : 'Apartments_Create';
      
      // הכנת הפרמטרים (אם זו עריכה, נוסיף את ה-ID)
      const params = this.isEditMode 
        ? { ...apartmentData, Id: this.apartmentId } 
        : apartmentData;

      this.apartmentService.exec(procedureName, params).subscribe({
        next: () => {
          alert('הנתונים נשמרו בהצלחה!');
          this.router.navigate(['/apartments']);
        },
        error: (err) => {
          console.error('שגיאה בשמירה:', err);
          alert('חלה שגיאה בשמירת הנתונים. בדקי את הטרמינל.');
        }
      });
    } else {
      // אם הטופס לא תקין, נסמן את כל השדות כדי להציג הודעות שגיאה
      this.apartmentForm.markAllAsTouched();
    }
  }

  goBack(): void {
    // פונקציית החזרה שה-HTML חיפש
    this.router.navigate(['/apartments']);
  }
}
