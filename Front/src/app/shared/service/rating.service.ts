import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private apiUrl = 'http://localhost:8080/api/rating';

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

    submitRating(data: any): Observable<any> {
        return this.http.post(this.apiUrl + '/rate', data, {headers: this.getAuthHeaders()});
    }

    getAverageRating(eventId: number): Observable<number> {
        return this.http.get<number>(this.apiUrl + `/rating/${eventId}`, {headers: this.getAuthHeaders()});
    }
}
