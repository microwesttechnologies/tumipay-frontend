import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'Core/Config/Enviroment';
import { GetByIdEmployeeGateway } from 'Core/Domain/Gateway/GetByIDEmployee.Gateway';
import { Employee } from 'Core/Domain/Model/Employee.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetByIdEmployeeService extends GetByIdEmployeeGateway {
  constructor(private http: HttpClient) {
    super();
  }

  override getAllById(id_employee: number): Observable<Employee> {

    return this.http.get<Employee>(`${environment.apiUrl}employees/${id_employee}`);

  }
}
