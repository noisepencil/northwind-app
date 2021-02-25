import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
  public message: string;
  public formTitle: string = 'New Employee';
  constructor(
    private empService: EmployeeService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.getEmployee();
  }

  async getEmployee() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id === "new") {

      // adding an emp, set defaut values for new emp
      this.employee = {id: 0, firstName:'', lastName: ''};

      // set form title
      this.formTitle = 'Add Employee';

    } else {

      // editing an emp, look it up with API
      this.employee = await this.empService.getEmployeeAsync(+id);

      // set form title
      this.formTitle = 'Edit Employee';

    }
  }

  goBack() {
    this.location.back();
  }
  async onSave(emp: Employee){
    console.log('OnSave gave us:', emp);
    console.log('my emp is currently:', this.employee);
    await this.save();
  }
  async save() {

    // clear validation message if any
    this.message = null;

    if (this.employee.id == 0){
      // new emp
      try {
        await this.empService.addEmployee(this.employee)

        this.goBack()

      } catch(error) {
        this.handleError(error);
      }

    } else {

      // update existing
      try {
        
        await this.empService.updateEmployee(this.employee)

        this.goBack()

      } catch(error) {
        this.handleError(error);        
      }
    }
  }

  handleError(error: any) {

    console.log(error);

    if (error instanceof HttpErrorResponse) {
      this.message = error.error;
    } else if (error instanceof Error) {
      this.message = error.message;
    }
  }
}