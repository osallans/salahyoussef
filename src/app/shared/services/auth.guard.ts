import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //return true;
        const currentEmployee = this.authenticationService.currentUserValue;
        if (currentEmployee){//&&currentEmployee.isactive==1) {
            // logged in so return true
            return true;
        } 

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
        
    }
}