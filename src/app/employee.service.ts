import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private emps: Employee[] = [
    {id: 1, firstName: 'Colt', lastName: 'Andrews'},
    {id: 2, firstName: 'Michael', lastName: 'Andrews'},
    {id: 3, firstName: 'Kelley', lastName: 'Andrews'},
    {id: 4, firstName: 'Mikaela', lastName: 'Andrews'},
    ]

  constructor() { }

  public async getAllEmployees(): Promise<Employee[]> {

    return this.emps;
  
  }

  public async getEmployee(id: number): Promise<Employee> {
    return this.emps.find(e => e.id == id);
  }

}
