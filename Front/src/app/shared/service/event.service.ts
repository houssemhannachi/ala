import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Event {
  eventId?: number;
  title: string;
  description: string;
  scheduledAt: Date;
  isFull?: boolean; 
  capacity?: number;  // ✅ Ajout de la capacité

}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8076/api/events/admin';

  constructor(private http: HttpClient) {}
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // 🔥 Vérifie si le token est bien récupéré
    console.log('Token envoyé:', token); // ✅ Affiche le token dans la console

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/upcoming`,{ headers: this.getAuthHeaders() }); // ✅ Correction
  }

  getUpAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/all`,{ headers: this.getAuthHeaders() }); // ✅ Correction
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create-event`, event,{ headers: this.getAuthHeaders() });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // ✅ Correction
  }
  /*getEventById(id: number): Observable<Event> {
    const url = `${this.apiUrl}/admin/{id}${id}`;
    return this.http.get<Event>(url);
  }*/
    getEventQRCodeUrl(eventId: number): Observable<string> {
      return this.http.get(`${this.apiUrl}/qr/${eventId}`, { 
        headers: this.getAuthHeaders(), 
        responseType: 'blob' 
      }).pipe(
        map((blob: Blob) => URL.createObjectURL(blob))
      );
    }
    
  getEventById(id:number): Observable<any> {

    return this.http.get<any>(this.apiUrl+"/"+id,{ headers: this.getAuthHeaders() });
  }

  updateEvent(eventId :number,event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/update-event/${eventId}`, event,{ headers: this.getAuthHeaders() }); // ✅ Correction
  }
 
}
