import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items`, payload);
  }

  updateCartItem(itemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/items/${itemId}`, { quantity });
  }

  removeCartItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/items/${itemId}`);
  }
}
