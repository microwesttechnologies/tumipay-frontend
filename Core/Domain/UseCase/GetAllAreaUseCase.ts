import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllAreaGateway } from '../Gateway/GetAllArea.Gateway';
import { Area } from '../Model/Area.Model';


@Injectable({
  providedIn: 'root',
})
export class GetAllAreaUseCases {
  constructor(private _areaGateway: GetAllAreaGateway) {}

  getAllAreas(): Observable<Array<Area>> {
    return this._areaGateway.getAll();
  }
}
