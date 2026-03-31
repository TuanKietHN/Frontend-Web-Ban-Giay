import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;
  private adminApiUrl = `${environment.apiUrl}/admin/orders`;

  constructor(private http: HttpClient) { }

  checkout(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, payload);
  }

  getAdminOrders(page: number = 0, size: number = 20): Observable<any> {
    return this.http.get<any>(`${this.adminApiUrl}?page=${page}&size=${size}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.adminApiUrl}/${orderId}/status`, { status });
  }
}
