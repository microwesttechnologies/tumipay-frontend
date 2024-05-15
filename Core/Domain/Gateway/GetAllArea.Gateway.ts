import { Observable } from "rxjs";
import { Area } from "../Model/Area.Model";

export abstract class GetAllAreaGateway {
    abstract getAll(): Observable<Array<Area>>;
}
