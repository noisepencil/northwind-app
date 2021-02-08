import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiBaseUrl: string = 'https://localhost:5001';

  constructor(
    private http: HttpClient
  ) { }

  public getAllEmployees(): Observable<Employee[]> {

    let url = `${this.apiBaseUrl}/employees`;

    // async/await only works on promises, but http.get returns an observable -
    // but observables have a .toPromise() method to convert it to one :)
    // let response = this.http.get<Employee[]>(url, {
    //   headers: new HttpHeaders({'Content-type': 'application/json'})
    // });

    let response = this.http.get<Employee[]>(url, this.httpOptions);

    return response;
  }
  
  public async getAllEmployeesAsync(): Promise<Employee[]> {

    let url = `${this.apiBaseUrl}/employees`;
    // async/await only works on promises, but http.get returns an observable -
    // but observables have a .toPromise() method to convert it to one :)
    let response = this.http.get<Employee[]>(url, this.httpOptions).toPromise();

    return response;
  }
  
  public async getEmployeeAsync(id: number): Promise<Employee> {
    let url = `${this.apiBaseUrl}/employees/${id}`;
    return await this.http.get<Employee>(url).toPromise();
  }

}
