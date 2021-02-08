import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  public employee: Employee;

  constructor(
    private empService: EmployeeService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

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