import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';


@Injectable()

export class UserService {


  constructor(private httpService: HttpRequestsService) {}

  getUsers(user: User): Observable<User[]> {
    return this.httpService.postHTTPRequest('users',user)
      .pipe(map((responseData: User[]) => responseData));
  }

  orderCard(userid:number):Observable<any> {
    return this.httpService.putHTTPRequest('api/user/'+userid+'/cardstatus/10',{})
      .pipe(map((responseData: User[]) => responseData));
  }

  getStatus(): Observable<User[]> {
    return this.httpService.getHTTPRequest('user/back/status/list')
      .pipe(map((responseData: User[]) => responseData));
  }
  updateStatus(data:any): Observable<any> {
    return this.httpService.postHTTPRequestFile('user/back/massUpdate',data)
      .pipe(map((responseData: any) => responseData)); 
  }
  uploadFile(formData,companyId) {
    return this.httpService.postHTTPRequestFile('user/back/massCreate/'+companyId,formData)
      .pipe(map((responseData: User[]) => responseData)); 
  }
 
  deleteUser(user: User):  void{
     this.httpService.putHTTPRequest('users/delete', user)
      .pipe(map((responseData: User) => responseData));
  }

}