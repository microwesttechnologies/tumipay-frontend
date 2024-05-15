import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../Model/Area.Model';
import { GetAllCategoryGateway } from '../Gateway/GetAllCategory.Gateway';
import { Category } from '../Model/Category.Model';


@Injectable({
  providedIn: 'root',
})
export class GetAllCategoryUseCases {
  constructor(private _categoryGateway: GetAllCategoryGateway) {}

  getAllCategories(): Observable<Array<Category>> {
    return this._categoryGateway.getAll();
  }
}
