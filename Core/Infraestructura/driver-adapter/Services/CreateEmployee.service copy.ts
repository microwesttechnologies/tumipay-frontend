import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'Core/Config/Enviroment';
import { CreateEmployeeGateway } from 'Core/Domain/Gateway/CreateEmployee.Gateway';
import { Employee } from 'Core/Domain/Model/Employee.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateEmployeeService extends CreateEmployeeGateway {

  constructor(private http: HttpClient) {
    super();
  }

  create(employee: Employee): Observable<Object> {
    return this.http.post(environment.apiUrl + 'employees', employee);
  }

}
