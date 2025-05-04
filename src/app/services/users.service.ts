import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  password_hash: string;
  is_admin: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
  is_admin: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl  = 'http://localhost:5114/api/Users';
  private authUrl = 'http://localhost:5114/api/Auth';

  constructor(private http: HttpClient) {}

  login(creds: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, creds);
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.authHeaders() });
  }

  createUser(u: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, u, { headers: this.authHeaders() });
  }

  updateUser(u: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${u.id}`, u, { headers: this.authHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
  }
}
