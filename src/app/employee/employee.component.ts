import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { EmployeesComponent } from '../employees/employees.component';
import { Employee } from '../models/employee';
import { Location } from '@angular/common';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input()
  public employee: Employee
  
  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location) { }

  async ngOnInit() {
    await this.getEmployee();
  }

  async getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employee = await this.empService.getEmployeeAsync(id);
  }
  
  goBack() {
    this.location.back();
  }
}
