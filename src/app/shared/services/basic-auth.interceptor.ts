import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;
         if (true){//currentUser && currentUser.token) {
               request = request.clone({
                headers: request.headers.set(
                  'Authorization',
                  'Bearer ' + 'MY_API_KEY_SALAHYOUSSEF'//currentUser.token
                )});
           
        }

        return next.handle(request);
    }
}