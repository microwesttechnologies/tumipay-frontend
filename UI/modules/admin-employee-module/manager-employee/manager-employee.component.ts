import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'Core/Domain/Model/Employee.Model';
import { GetEmployeeUseCases } from 'Core/Domain/UseCase/GetAllEmployeeUseCase';

@Component({
  selector: 'app-manager-employee',
  templateUrl: './manager-employee.component.html',
  styleUrls: ['./manager-employee.component.scss'],
})
export class ManagerEmployeeComponent implements OnInit {
  @Output() changeVisible = new EventEmitter<boolean>();
  labelBtn: string = 'Crear Empleado';
  visibleCreate: boolean = false;
  visibleEdit: boolean = false;
  employees: Array<Employee> = [];
  response: any;
  showEditColumn: boolean = true;
  employeeData: any;

  columns = [
    { field: 'id_employee', name: 'N°', type: 'string', isSortable: true },
    { field: 'full_name', name: 'Nombre Completo', type: 'string', isSortable: true },
    { field: 'hire_date', name: 'Fecha ingreso', type: 'string', isSortable: true },
    { field: 'name_category', name: 'Categoria', type: 'string', isSortable: true },
    { field: 'name_area', name: 'Area', type: 'string', isSortable: true },
    { field: 'name_company', name: 'Compañia', type: 'string', isSortable: true },
    { field: 'satisfaction_level', name: 'Satisfacción', type: 'number' },
    { field: 'view', name: 'Ver', type: 'string' },
  ];

  openEditView(employeeData: Employee) {
    this.visibleEdit = true;
    this.employeeData = employeeData;
    console.log(employeeData);
  }


  showDialogCreate() {
    this.visibleCreate = true;
    this.changeVisible.emit(this.visibleCreate);
  }

  onCreateEmployeeVisibilityChange(visibleCreate: boolean) {
    this.visibleCreate = visibleCreate;
  }

  onEditEmployeeVisibilityChange(visibleEdit: boolean) {
    this.visibleEdit = visibleEdit;
  }

  getAllEmployee() {
    this.response = this._getAllEmployeeUseCase.getAllEmployee()
    .subscribe(
      data => {
        this.employees = data;
      },
      (error: any) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }




  constructor(private _getAllEmployeeUseCase: GetEmployeeUseCases) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }
}
