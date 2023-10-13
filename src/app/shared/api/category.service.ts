import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';

@Injectable()

export class CategoryService {

  constructor(private httpService: HttpRequestsService) {}

  
  getCategoriesList(): Observable<Category[]> {
    return this.httpService.getHTTPRequest('api/category/hierarchy')
      .pipe(map((responseData: Category[]) => responseData));
  }

}