import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowCase } from "../models/showcase.model";
import { Product } from "../models/product.model";

@Injectable()

export class ShowCaseService {

  public cartRefresh: Subject<string> = new Subject<string>();
  constructor(private httpService: HttpRequestsService) {} 



  saveItemToShowCase(showCaseId:number,userid:number,username:string,productid:number)
  {
    let showcase:ShowCase;
    showcase=JSON.parse(localStorage.getItem('ShowCase_'+userid));
    let result=this.checkItemInShowCase(showCaseId,userid,productid);
    //Creating new showcase
    if(result=="No ShowCase")
    {
      showcase=this.createNewShowcase(userid,username);
      let product=new Product();
      product.id=productid;
      showcase.products.push(product);
    }
    else if(result=="No Product")
    {
      let product=new Product();
      product.id=productid;
      showcase.products.push(product);
    }
    localStorage.setItem('ShowCase_'+userid,JSON.stringify(showcase));

  }

  getShowCaseItems(userid:number,showCaseId:number)
  {
    let showcase:ShowCase;
    showcase=JSON.parse(localStorage.getItem('ShowCase_'+userid));
    return showcase; 
  }

  createNewShowcase(userid:number,username:string):ShowCase
  {
      let showcase=new ShowCase();
      showcase.userid=userid;
      //
      showcase.id=1;
      //
      showcase.title=username+"_"+Date.now();
      showcase.title=username+"_"+Date.now();
      showcase.isactive=0;
      return showcase;
  }

  checkItemInShowCase(showCaseId:number,userid:number,productid:number):string
  {
    if(localStorage.getItem('ShowCase_'+userid))return "No Showcase";
    
    let showcase:ShowCase;
    showcase=JSON.parse(localStorage.getItem('ShowCase_'+userid+'_'+showCaseId));
    /////////////////////////////////////////////////////////
    var found = false;
    for(var i = 0; i < showcase.products.length; i++) {
    if (showcase.products[i].id == productid) {
        found = true;
        return "Found";
    }
  }
  return "No product";

  }
  addProductToShowCase(userId:number,productid:number)
  {
    return this.httpService.postHTTPRequest('api/showcasecart/user/'+userId+'/product/'+productid,{})
    .pipe(map((responseData: any) => responseData));
  }

  //TO DO
  getShowCaseById(showCaseId)
  {
    return this.httpService.getHTTPRequest('api/showcase/'+showCaseId)
    .pipe(map((responseData: any) => responseData));

  }
  getShowCaseProducts(userId:number)
  {
    return this.httpService.getHTTPRequest('api/showcasecart/user/'+userId)
    .pipe(map((responseData: any) => responseData));

  }

  removeProductToShowCase(userId:number,productid:number)
  {
    return this.httpService.deleteHTTPRequest('api/showcasecart/user/'+userId+'/product/'+productid)
   .pipe(map((responseData: any) => responseData));

  }
  /////////////////////////////////////////
  getShowCasesByUserId(userid:number)
  {
    return this.httpService.getHTTPRequest('api/user/'+userid+'/showcase')
      .pipe(map((responseData: any) => responseData));
  }
    /////////////////////////////////////////
    getAllShowCases()
    {
      return this.httpService.getHTTPRequest('api/showcase?isactive=1&pagesize=1000&page=1')
        .pipe(map((responseData: any) => responseData));
    }
  submitShowCase()
  {
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
  }

}