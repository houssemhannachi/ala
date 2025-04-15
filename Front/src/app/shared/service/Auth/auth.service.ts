import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
      console.log('📤 Données envoyées depuis AuthService:', userData);

      return this.http.post(`${this.baseUrl}/auth/register`, userData);
    }



  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, { token });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password?token=${token}`, { password });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/adminuser/get-profile`, {headers});
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token!=null;
  }
  logOut(): any {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  }

}
