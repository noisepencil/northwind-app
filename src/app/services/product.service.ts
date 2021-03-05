import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiBaseUrl: string = 'https://localhost:5001';

  constructor(
    private http: HttpClient
  ) { }
  
  public async getProductsAsync(nameFilter: string, discontinuedFilter: string): Promise<Product[]> {
    
    let url = `${this.apiBaseUrl}/products`;

    let queryString: string = "";
    let filterCount: number = 0;
    if (nameFilter.length > 0) {
      queryString = queryString + `name=${nameFilter}`;
      filterCount++;
    }
    if (discontinuedFilter.length > 0) {
      queryString = queryString + `&discontinued=${discontinuedFilter}`;
      filterCount++;
    }

    if (filterCount>0){
      url = url + "?" + queryString;
    }

    let response = this.http.get<Product[]>(url, this.httpOptions).toPromise();

    return response;
  }
}
