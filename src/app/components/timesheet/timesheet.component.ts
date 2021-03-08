import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from 'src/app/interfaces/department';
import { FormControl } from '@angular/forms';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  departments: Department[] = [];
  department: any;
  employeeNameFC = new FormControl('');
  employess: Employee[] = [];
  employeeId = 0;

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(
      (department) => department.id === this.route.snapshot.params['id']
    );
  }
  addEmployee(): void {
    if (this.employeeNameFC.value) {
      this.employeeId++;

      this.employess.push({
        id: this.employeeId.toString(),
        departmentId: this.department.id,
        name: this.employeeNameFC.value,
        payRate: Math.floor(Math.random() * 50) + 50,
      });

      this.employeeNameFC.setValue('');
    }
  }
}
