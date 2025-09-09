import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DataResponse } from './interfaces/data-response';

@Injectable({
  providedIn: 'root'
})
export class LegoService {
  constructor(private http: HttpClient) { }

  getLegos(page: number, limit: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${environment.apiUrl}?page=${page}&limit=${limit}`);
  }

  getColumns(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/columns`);
  }

  getSearchOptions(column: string, value: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/search-options?column=${column}&value=${value}`);
  }

  getLegosByFilter(column: string, value: string, page: number, limit: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${environment.apiUrl}/filter?column=${column}&value=${value}&page=${page}&limit=${limit}`);
  }

  addLego(lego: any): Observable<DataResponse> {
    return this.http.post<DataResponse>(`${environment.apiUrl}`, lego);
  }

  editLego(lego: any, id: number): Observable<DataResponse> {
    return this.http.put<DataResponse>(`${environment.apiUrl}/${id}`, lego);
  }

  deleteLego(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${id}`);
  }
}
