import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetByIdEmployeeUseCases } from 'Core/Domain/UseCase/GetAllByIdEmployeeUseCase';
import { UpdateEmployeeUseCases } from 'Core/Domain/UseCase/UpdateEmployeeUseCase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'Core/Domain/Model/Employee.Model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() changeVisible = new EventEmitter<boolean>();
  @Input() id_employee: any;
  @Input() data!: Employee;
  full_name!: string;
  hire_date!: string;
  email!: string;
  name_company!: string;
  name_area!: number;
  name_category!: string;
  formUpdate!: FormGroup;

  constructor(
    private _getByIdEmployee: GetByIdEmployeeUseCases,
    private _updateEmployee: UpdateEmployeeUseCases,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadEmployeeData();
    this.formUpdate = this.formBuilder.group({
      full_name: ['', Validators.required],
      hire_date: ['', Validators.required],
      email: ['', Validators.required],
      name_area: ['', Validators.required],
      name_category: ['', Validators.required],
      name_company: ['', Validators.required],
      satisfaction_level: ['', Validators.required]
    });
  }

  loadEmployeeData() {
    if (this.id_employee) {
      this._getByIdEmployee.getEmployeeById(this.id_employee).subscribe(
        (employee: Employee | null) => {
          if (employee) {
            this.formUpdate.patchValue({
              full_name: employee.full_name,
              email: employee.email,
              hire_date: employee.hire_date,
              name_area: employee.name_area,
              name_category: employee.name_category,
              name_company: employee.name_company,
              satisfaction_level: employee.satisfaction_level
            });
            console.log(this.formUpdate)
          }
        },
        (error) => {
          console.error('Error al cargar datos del empleado:', error);
        }
      );
    }
  }



  updateEmployeeData() {
    const updatedEmployee: Employee = {
      full_name: this.formUpdate.value.full_name,
      hire_date: this.formUpdate.value.hire_date,
      email: this.formUpdate.value.email,
      name_area: this.formUpdate.value.name_area,
      name_category: this.formUpdate.value.name_category,
      name_company: this.formUpdate.value.name_company,
      satisfaction_level: this.formUpdate.value.satisfaction_level,
      favorite:this.formUpdate.value.favorite
    };

    this._updateEmployee.updateEmployee(this.id_employee, updatedEmployee).subscribe(
      () => {
        Swal.fire({
          title: "Actualización exitosa!",
          text: "El empleado ha sido actualizado exitosamente",
          icon: "success"
        }).then((result) => {
          if (result) {
            this.onDialogHide();
          }
        });
      },
      (error) => {
        Swal.fire({
          title: "Error al actualizar empleado",
          text: "Hubo un error al actualizar el empleado. Por favor, inténtalo de nuevo.",
          icon: "error",
          customClass: {
            container: 'custom-sweetalert-container'
          }
        }).then((result) => {
          if (result) {
            this.onDialogHide();
          }
        });
      }
    );
  }


  onDialogHide() {
    this.visible = false;
    this.changeVisible.emit(this.visible);
  }
}
