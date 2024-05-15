import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'Core/Domain/Model/Employee.Model';
import { GetEmployeeUseCases } from 'Core/Domain/UseCase/GetAllEmployeeUseCase';
import { UpdateEmployeeUseCases } from 'Core/Domain/UseCase/UpdateEmployeeUseCase';

@Component({
  selector: 'app-manager-employee',
  templateUrl: './manager-employee.component.html',
  styleUrls: ['./manager-employee.component.scss'],
})
export class ManagerEmployeeComponent implements OnInit {
  @Output() changeVisible = new EventEmitter<boolean>();
  visibleListFavorites: boolean = false;
  visibleCreate: boolean = false;
  visibleEdit: boolean = false;
  employees: Array<Employee> = [];
  employeeFavorites: Array<Employee> = [];
  response: any;
  employeeData: any;

  columns = [
    { field: 'id_employee', name: 'N°', type: 'string', isSortable: true },
    {
      field: 'full_name',
      name: 'Nombre Completo',
      type: 'string',
      isSortable: true,
    },
    {
      field: 'hire_date',
      name: 'Fecha ingreso',
      type: 'string',
      isSortable: true,
    },
    {
      field: 'name_category',
      name: 'Categoria',
      type: 'string',
      isSortable: true,
    },
    { field: 'name_area', name: 'Area', type: 'string', isSortable: true },
    {
      field: 'name_company',
      name: 'Compañia',
      type: 'string',
      isSortable: true,
    },
    { field: 'satisfaction_level', name: 'Satisfacción', type: 'number' },
    { field: 'favorite', name: '¿Favorito?', type: 'number' },
    { field: 'view', name: 'Ver', type: 'string' },
  ];

  openEditView(employeeData: Employee) {
    this.visibleEdit = true;
    this.employeeData = employeeData;
    console.log(employeeData);
  }

  updateEmployee = (id: any) => {
    const foundEmployee = this.employees.find(
      (employee) => employee.id_employee === id
    );
    this._updateEmployeeUseCases
      .updateEmployee(id, {
        ...foundEmployee,
        favorite: foundEmployee?.favorite === 1 ? 2 : 1,
      })
      .subscribe(
        (data) => {
          if (foundEmployee?.id_employee)
            foundEmployee.favorite = foundEmployee?.favorite === 1 ? 2 : 1;

          this.employeeFavorites = this.employees.filter(
            (employee) => employee.favorite === 2
          );
        },
        (error: any) => {
          console.error('Error al obtener los empleados:', error);
        }
      );
  };

  showDialogCreate() {
    this.visibleCreate = true;
    this.changeVisible.emit(this.visibleCreate);
  }

  showListFavorites() {
    this.visibleListFavorites = true;
  }

  onCreateEmployeeVisibilityChange(visibleCreate: boolean) {
    this.visibleCreate = visibleCreate;
  }

  onEditEmployeeVisibilityChange(visibleEdit: boolean) {
    this.visibleEdit = visibleEdit;
  }

  getAllEmployee() {
    this.response = this._getAllEmployeeUseCase.getAllEmployee().subscribe(
      (data) => {
        this.employees = data;
        this.employeeFavorites = this.employees.filter(
          (employee) => employee.favorite === 2
        );
      },
      (error: any) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

  constructor(
    private _getAllEmployeeUseCase: GetEmployeeUseCases,
    private _updateEmployeeUseCases: UpdateEmployeeUseCases
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }
}
