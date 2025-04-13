import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  eventId: number;
  userId:number;
  fullName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8076/api/events';  // 🌟 URL de l'API backend

  constructor(private http: HttpClient) {}

  // 🔥 Générer les headers avec le token
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);  // ✅ Debug: Voir le token
    return new HttpHeaders({
      'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    });
  }

  // 🌟 Réserver un événement
  reserveEvent(reservation: Reservation): Observable<string> {
    const url = `${this.apiUrl}/user/reserve`;
    return this.http.post<string>(url, reservation, { headers: this.getAuthHeaders() });
  }
getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/user/upcoming`,{ headers: this.getAuthHeaders() }); // ✅ Correction
  }
  
}