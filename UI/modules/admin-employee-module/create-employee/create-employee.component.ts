import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImageGateway } from 'Core/Domain/Gateway/UploadImageGateway';
import { Area } from 'Core/Domain/Model/Area.Model';
import { Category } from 'Core/Domain/Model/Category.Model';
import { Company } from 'Core/Domain/Model/Company.Model';
import { CreateEmployeeUseCases } from 'Core/Domain/UseCase/CreateEmployeeUseCase';
import { GetAllAreaUseCases } from 'Core/Domain/UseCase/GetAllAreaUseCase';
import { GetAllCategoryUseCases } from 'Core/Domain/UseCase/GetAllCategoryUseCase';
import { GetAllCompanyUseCases } from 'Core/Domain/UseCase/GetAllCompanyUseCase';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateEmployeeComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() changeVisible = new EventEmitter<boolean>();
  areas: Array<Area> = [];
  companies: Array<Company> = [];
  categories: Array<Category> = [];
  response: any;

  formCreate!: FormGroup;

  constructor(
    private _createEmployeeUseCase: CreateEmployeeUseCases,
    private _getAllCompanyUseCase: GetAllCompanyUseCases,
    private _getAllCategoriesUseCase: GetAllCategoryUseCases,
    private _getAllAreasUseCase: GetAllAreaUseCases,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formCreate = this.formBuilder.group({
      full_name: ['', Validators.required],
      hire_date: ['', Validators.required],
      email: ['', Validators.required],
      name_company: ['', Validators.required],
      name_area: ['', Validators.required],
      name_category: ['', Validators.required],
      satisfaction_level: ['', Validators.required],
    });

    this.getAllCompany();
    this.getAllCategory();
    this.getAllArea();
  }

  onDialogHide() {
    this.visible = false;
    this.changeVisible.emit(this.visible);
  }

  showDialog() {
    this.visible = !this.visible;
    this.changeVisible.emit(this.visible);
  }

  createEmployee() {
    if (this.formCreate.valid) {
      const newEmployee = {
        full_name: this.formCreate.value.full_name,
        hire_date: this.formCreate.value.hire_date,
        email: this.formCreate.value.email,
        id_company: this.formCreate.value.name_company,
        id_area: this.formCreate.value.name_area,
        id_category: this.formCreate.value.name_category,
        satisfaction_level: this.formCreate.value.satisfaction_level,
      };
      console.log(newEmployee);
      this._createEmployeeUseCase.createEmployee(newEmployee).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Creación exitosa!',
            text:
              'El empleado queda asignado con el ID: ' +
              JSON.stringify(response),
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.onDialogHide();
            }
          });
        },
        () => {
          Swal.fire({
            title: 'Cargue Fallido!',
            text: 'Error en el sistema, no permite la creación del empleado',
            icon: 'error',
            customClass: {
              container: 'custom-sweetalert-container',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.onDialogHide();
            }
          });
        }
      );
    }
  }

  isFormValid(): boolean {
    return this.formCreate.valid;
  }

  getAllCompany() {
    this.response = this._getAllCompanyUseCase.getAllCompanies()
    .subscribe(
      data => {
        this.companies = data;
      },
      (error: any) => {
        console.error('Error al obtener los compañias:', error);
      }
    );
  }
  getAllArea() {
    this.response = this._getAllAreasUseCase.getAllAreas()
    .subscribe(
      data => {
        this.areas = data;
      },
      (error: any) => {
        console.error('Error al obtener las areas:', error);
      }
    );
  }

  getAllCategory() {
    this.response = this._getAllCategoriesUseCase.getAllCategories()
    .subscribe(
      data => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }
}
