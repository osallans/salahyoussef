import { ErrorHandler, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router:Router,private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        
        return next.handle(request).pipe(catchError(error => {
                if(request.url.indexOf('signin')<=-1){
                if ([401, 403].includes(error.status)) {
                    // auto logout if 401 response returned from api
                    //this.authenticationService.logout();
                    //this.router.navigate(['/login']);
                    console.log(request);
                }
            }
            let errorMessage = '';
            
            if(error.status===202 || error.status===201)
            {
                console.log(error);
                errorMessage = `Status Code: ${error.status}\nMessage: ${error.statusText}`;
                return throwError(errorMessage);
            }
            //////////////////////////
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message?error.error.message:error.message}`;
            }
            return throwError(errorMessage);
            })
    );
        }
}