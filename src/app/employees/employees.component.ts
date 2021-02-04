import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService
  ) { }

  async ngOnInit() {
    this.employees = await this.employeeService.getAllEmployees();
  }
  
}