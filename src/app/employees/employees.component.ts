import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[] = [];
  public filterTxt: string = "";

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  async ngOnInit() {
  
    this.employees = await this.employeeService.getAllEmployeesAsync();

  }

  add() {
    this.router.navigateByUrl('/employee/new')
  }

  async onFilterClick() {
    // apply the filter re-fetching the data
    this.employees = await this.employeeService.getAllEmployeesWithFilterAsync(this.filterTxt);
  }

}
