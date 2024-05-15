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
import { Employee } from 'Core/Domain/Model/Employee.Model';
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
  selector: 'app-list-favorites-employee',
  templateUrl: './list-favorites-employee.component.html',
  styleUrls: ['./list-favorites-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListFavoritesEmployeeComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data!: Employee[];
  @Output() changeVisible = new EventEmitter<boolean>();
  @Output() changeStatusFavorite = new EventEmitter<number>();

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
  ];

  constructor() {}

  ngOnInit() {}

  onDialogHide() {
    this.visible = false;
    this.changeVisible.emit(this.visible);
  }

  onChangeStatusFavorite(id: number) {
    this.changeStatusFavorite.emit(id);
  }
}
