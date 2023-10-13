import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowCase } from "../models/showcase.model";
import { Product } from "../models/product.model";

@Injectable()

export class FavouriteService {

  constructor(private httpService: HttpRequestsService) {} 



  addProduct(userid:number,productid:number)
  {
    return this.httpService.postHTTPRequest('api/giftlist/user/'+userid+'/product/'+productid,{})
    .pipe(map((responseData: Product[]) => responseData));
  }

  getProducts(userid:number)
  {
    //api/product?page=1&pagesize=10&orderfield=id&orderdir=asc&isactive=1'api/giftlist/user/'+userid  
    return this.httpService.getHTTPRequest('api/giftlist/user/'+userid)
      .pipe(map((responseData: Product[]) => responseData));
  }

  removeProduct(userid:number,productid)
  {
    return this.httpService.deleteHTTPRequest('api/giftlist/user/'+userid+'/product/'+productid)
      .pipe(map((responseData: Product[]) => responseData));
  }

  

}