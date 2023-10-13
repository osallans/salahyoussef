import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { Store } from "../models/store.model";
import { StoreSearch } from "../models/storesearch.model";
import { Branch } from "../models/branch.model";

@Injectable()

export class StoreService {

  constructor(private httpService: HttpRequestsService) {} 

  
  getStoresList(): Observable<Store[]> {
    return this.httpService.getHTTPRequest('api/store?isactive=1&page=1&pagesize=1000')
      .pipe(map((responseData: Store[]) => responseData));
  }
  getStoresListFiltered(productSearchObj:StoreSearch): Observable<Store[]> {
    let search:String;
    search='page='+productSearchObj.page+'&pagesize='+productSearchObj.pagesize+"&isactive=1";
    search+=productSearchObj.styleid?"&styleid="+productSearchObj.styleid:"";
    search+=productSearchObj.districtid?"&districtid="+productSearchObj.districtid:"";
    return this.httpService.getHTTPRequest('api/store?'+search)
      .pipe(map((responseData: Store[]) => responseData));
  }
  getPromotions(productSearchObj:StoreSearch): Observable<Store[]> {
    let search:String;
    search='page='+productSearchObj.page+'&pagesize='+productSearchObj.pagesize+"&isactive=1";
    return this.httpService.getHTTPRequest('api/promotion?'+search)
      .pipe(map((responseData: Store[]) => responseData));
  }
  getStoreById(id:Number): Observable<Store[]> {
    return this.httpService.getHTTPRequest('api/store/'+id)
      .pipe(map((responseData: any) => responseData));
  }
  getBranchesById(id:Number): Observable<Branch[]> {
    return this.httpService.getHTTPRequest('api/store/'+id+'/branch')
      .pipe(map((responseData: any) => responseData));
  }
  postBranchUsage(id:Number): Observable<any> {
    return this.httpService.postHTTPRequest('api/branchcodeusage/branch/'+id,{})
      .pipe(map((responseData: any) => responseData));
  }
  getBranchById(id:Number): Observable<any> {
    return this.httpService.getHTTPRequest('api/branch/'+id)
      .pipe(map((responseData: any) => responseData));
  }
  getStoreStyles(storeid:number): Observable<any>
  {
    return this.httpService.getHTTPRequest('api/store/'+storeid+'/style')
      .pipe(map((responseData: any) => responseData));
  }
}