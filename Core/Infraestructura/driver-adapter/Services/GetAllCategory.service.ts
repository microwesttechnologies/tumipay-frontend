import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'Core/Config/Enviroment';
import { Category } from 'Core/Domain/Model/Category.Model';
import { GetAllCategoryGateway } from 'Core/Domain/Gateway/GetAllCategory.Gateway';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoryService extends GetAllCategoryGateway {
  constructor(private http: HttpClient) {
    super();
  }

  override getAll(): Observable<Category[]> {
    return this.http.get<Array<Category>>(environment.apiUrl+'categories');
  }

}
