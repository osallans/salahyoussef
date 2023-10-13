import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { Banner } from "../models/banner.model";
import { Blog } from "../models/blog.model";

@Injectable()

export class LookupService {

  constructor(private httpService: HttpRequestsService) {}

  getBannerList(): Observable<Banner[]> {
    return this.httpService.getHTTPRequest('api/adsbanner')
      .pipe(map((responseData: Banner[]) => responseData));
  }
  
  getBlogs(page,pagesize): Observable<Blog[]> {
    return this.httpService.getHTTPRequest('api/blog?page='+page+'&pagesize='+pagesize)
      .pipe(map((responseData: Blog[]) => responseData));
  }
  
  getBlog(id): Observable<Blog[]> {
    return this.httpService.getHTTPRequest('api/blog/'+id)
      .pipe(map((responseData: Blog[]) => responseData));
  }
  
  getStylesList(): Observable<Category[]> {
    return this.httpService.getHTTPRequest('api/style')
      .pipe(map((responseData: Category[]) => responseData));
  }
  getDistrictsList(): Observable<Category[]> {
    return this.httpService.getHTTPRequest('api/district')
      .pipe(map((responseData: Category[]) => responseData));
  }
  getRoomsList(): Observable<Category[]> {
    return this.httpService.getHTTPRequest('api/room')
      .pipe(map((responseData: Category[]) => responseData));
  }
  sendEmail(email)
  {
    return this.httpService.postHTTPRequest('api/mail/contactus',email)
    .pipe(map((responseData: any) => responseData));
  }
}