import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'Core/Config/Enviroment';
import { GetAllAreaGateway } from 'Core/Domain/Gateway/GetAllArea.Gateway';
import { Area } from 'Core/Domain/Model/Area.Model';

@Injectable({
  providedIn: 'root',
})
export class GetAllAreaService extends GetAllAreaGateway {
  constructor(private http: HttpClient) {
    super();
  }

  override getAll(): Observable<Area[]> {
    return this.http.get<Array<Area>>(environment.apiUrl+'areas');
  }

}
