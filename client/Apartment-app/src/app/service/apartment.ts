import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiUrl = 'http://localhost:5001/api/exec'; // החליפי בפורט של ה-API שלך

  constructor(private http: HttpClient) { }

  // פונקציה גנרית לביצוע כל הקריאות ל-DB
  exec<T>(procedureName: string, parameters: any = {}): Observable<T> {
    const requestBody = {
      procedureName: procedureName,
      parameters: parameters
    };
    return this.http.post<T>(this.apiUrl, requestBody);
  }
}