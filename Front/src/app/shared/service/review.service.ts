import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


export interface Review {
  id?: any;
  content: string;
  username?: string;
  eventId: number;
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // 🔥 Vérifie si le token est bien récupéré
    console.log('Token envoyé:', token); // ✅ Affiche le token dans la console

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  loadReviews(eventId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + `/event/${eventId}`, {headers: this.getAuthHeaders()});
  }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review,{headers: this.getAuthHeaders()});
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers: this.getAuthHeaders()});
  }

}
