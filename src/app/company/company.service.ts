import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/shared/models/company.model';

@Injectable()

export class CompanyService {

  constructor(private httpService: HttpRequestsService) {}

  getCompanies(company: Company): Observable<Company[]> {
    return this.httpService.postHTTPRequest('company/back/companies',company)
      .pipe(map((responseData: Company[]) => responseData));
  }
  getCompaniesList(): Observable<Company[]> {
    return this.httpService.getHTTPRequest('company/back/companies/list')
      .pipe(map((responseData: Company[]) => responseData));
  }

  addCompany(company: Company): Observable<Company> {

    if(company.companyId)
    return this.httpService.postHTTPRequest('company/back/edit', company)
       .pipe(map((responseData: Company) => responseData));
    else
     return this.httpService.postHTTPRequest('company/back/add', company)
       .pipe(map((responseData: Company) => responseData));
   }

  deleteCompany(company: Company):  void{
     this.httpService.putHTTPRequest('companies/delete', company)
      .pipe(map((responseData: Company) => responseData));
  }

}