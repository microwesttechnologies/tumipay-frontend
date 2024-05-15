import { Observable } from "rxjs";
import { Employee } from "../Model/Employee.Model";

export abstract class GetByIdEmployeeGateway {
    abstract getAllById(id_employee: number): Observable<Employee>;
}
