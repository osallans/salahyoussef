import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyTier } from 'src/app/shared/models/tier.model';

@Injectable()

export class CompanyTierService {

  constructor(private httpService: HttpRequestsService) {}

  getCompanyTiers(companyTier: CompanyTier): Observable<CompanyTier[]> {
    return this.httpService.postHTTPRequest('companytier',companyTier)
      .pipe(map((responseData: CompanyTier[]) => responseData));
  }


  addCompanyTier(companyTier: CompanyTier): Observable<CompanyTier> {

    if(companyTier.companyTierId)
    return this.httpService.postHTTPRequest('company/back/tierEdit', companyTier)
       .pipe(map((responseData: CompanyTier) => responseData));
    else
     return this.httpService.postHTTPRequest('company/back/tierAdd', companyTier)
       .pipe(map((responseData: CompanyTier) => responseData));
   }

  deleteCompanyTier(id: number): Observable<any>{  
    return this.httpService.postHTTPRequest('company/back/tierRemove/'+id, null)
      .pipe(map((responseData: CompanyTier) => responseData));
  }

}