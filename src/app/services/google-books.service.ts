import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyAEVd6YgaQKqSGJ5LapgG016FRlVuYFMvk'; // Insira sua chave aqui

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(query)}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
