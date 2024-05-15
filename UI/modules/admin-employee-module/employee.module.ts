import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ManagerEmployeeComponent } from './manager-employee/manager-employee.component';
import { ComponentsModule } from 'UI/components/components.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HttpClientModule } from '@angular/common/http';
import { GetAllEmployeeGateway } from 'Core/Domain/Gateway/GetAllEmployee.Gateway';
import { GetAllEmployeeService } from 'Core/Infraestructura/driver-adapter/Services/GetAllEmployee.service';
import { GetByIdEmployeeGateway } from 'Core/Domain/Gateway/GetByIDEmployee.Gateway';
import { GetByIdEmployeeService } from 'Core/Infraestructura/driver-adapter/Services/GetAllByIdEmployee.service';
import { CreateEmployeeGateway } from 'Core/Domain/Gateway/CreateEmployee.Gateway';
import { CreateEmployeeService } from 'Core/Infraestructura/driver-adapter/Services/CreateEmployee.service copy';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { UpdateEmployeeGateway } from 'Core/Domain/Gateway/UpdateDEmployee.Gateway ';
import { UpdateEmployeeService } from 'Core/Infraestructura/driver-adapter/Services/UpdateEmployee.service';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { GetAllAreaGateway } from 'Core/Domain/Gateway/GetAllArea.Gateway';
import { GetAllCompanyGateway } from 'Core/Domain/Gateway/GetAllCompany.Gateway';
import { GetAllCategoryGateway } from 'Core/Domain/Gateway/GetAllCategory.Gateway';
import { GetAllAreaService } from 'Core/Infraestructura/driver-adapter/Services/GetAllArea.service';
import { GetAllCompanyService } from 'Core/Infraestructura/driver-adapter/Services/GetAllCompany.service';
import { GetAllCategoryService } from 'Core/Infraestructura/driver-adapter/Services/GetAllCategory.service';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ManagerEmployeeComponent,
    EditEmployeeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    InputSwitchModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageModule,
    FileUploadModule,
    ToastModule,
    RatingModule,
    DropdownModule
  ],
  exports: [
    CreateEmployeeComponent,
    ManagerEmployeeComponent,
    EditEmployeeComponent,
  ],
  providers: [
    { provide: GetAllEmployeeGateway, useClass: GetAllEmployeeService },
    { provide: GetAllAreaGateway, useClass: GetAllAreaService },
    { provide: GetAllCompanyGateway, useClass: GetAllCompanyService },
    { provide: GetAllCategoryGateway, useClass: GetAllCategoryService },
    { provide: GetByIdEmployeeGateway, useClass: GetByIdEmployeeService },
    { provide: CreateEmployeeGateway, useClass: CreateEmployeeService },
    { provide: UpdateEmployeeGateway, useClass: UpdateEmployeeService },
    { provide: MessageService },
  ],
})
export class EmployeeModule {}
