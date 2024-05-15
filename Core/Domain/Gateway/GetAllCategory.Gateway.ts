import { Observable } from "rxjs";
import { Category } from "../Model/Category.Model";

export abstract class GetAllCategoryGateway {
    abstract getAll(): Observable<Array<Category>>;
}
