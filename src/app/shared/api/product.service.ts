import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { ProductSearch } from "../models/productsearch.model";

@Injectable()

export class ProductService {

  constructor(private httpService: HttpRequestsService) {}

  getProducts(productSearchObj: ProductSearch): Observable<Product[]> {
    let search:String;
    search='page='+productSearchObj.page+'&pagesize='+productSearchObj.pagesize+"&isactive=1";
    search+=productSearchObj.orderfield?"&orderfield="+productSearchObj.orderfield:"";
    search+=productSearchObj.orderdir?"&orderdir="+productSearchObj.orderdir:"";
    search+=productSearchObj.pricemin?"&pricemin="+productSearchObj.pricemin:"";
    search+=productSearchObj.pricemax?"&pricemax="+productSearchObj.pricemax:"";
    search+=productSearchObj.categoryid?"&categoryid="+productSearchObj.categoryid:"";
    search+=productSearchObj.categoryids?"&categoryids="+productSearchObj.categoryids:"";
    search+=productSearchObj.styleid?"&styleid="+productSearchObj.styleid:"";
    search+=productSearchObj.roomid?"&roomid="+productSearchObj.roomid:"";
    search+=productSearchObj.storeid?"&storeid="+productSearchObj.storeid:"";
    search+=productSearchObj.districtid?"&districtid="+productSearchObj.districtid:"";
    search+=productSearchObj.isfeatured?"&isfeatured="+productSearchObj.isfeatured:"";
    search+=productSearchObj.specialoffers?"&specialoffers="+productSearchObj.specialoffers:"";
    return this.httpService.getHTTPRequest('api/product?'+search)
      .pipe(map((responseData: Product[]) => responseData));
  }
  
  getProductStyles(productid:Number): Observable<any>
  {
    return this.httpService.getHTTPRequest('api/product/'+productid+'/style')
      .pipe(map((responseData: any) => responseData));
  }
  getProductRooms(productid:Number): Observable<any>
  {
    return this.httpService.getHTTPRequest('api/product/'+productid+'/room')
      .pipe(map((responseData: any) => responseData));
  }
  getProductBranches(productid:Number): Observable<any>
  {
    return this.httpService.getHTTPRequest('api/product/'+productid+'/branch')
      .pipe(map((responseData: any) => responseData));
  }
  getRandomProducts(productSearchObj?: ProductSearch): Observable<any>
  {
    let search:String='';
     search+=productSearchObj.isfeatured?"isfeatured="+productSearchObj.isfeatured:"";
    search+=productSearchObj.specialoffers?"specialoffers="+productSearchObj.specialoffers:"";
    let url='api/product/random10'+(productSearchObj?('?'+search):'');
    return this.httpService.getHTTPRequest(url)
      .pipe(map((responseData: any) => responseData));
  }
  getProductCombs(productid:Number): Observable<any>
  {
    return this.httpService.getHTTPRequest('api/productcomb/product/'+productid)
      .pipe(map((responseData: any) => responseData));
  }

  getProductById(id: Number): Observable<any> {
    return this.httpService.getHTTPRequest('api/product/'+id)
       .pipe(map((responseData: Product) => responseData));
   }
   getProductImagesById(id: Number): Observable<any> {
    return this.httpService.getHTTPRequest('api/product/'+id+'/productpic')
       .pipe(map((responseData: Product) => responseData));
   }
}