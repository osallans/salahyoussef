import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';


import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpRequestsService } from './http-request.service';
import { from } from 'rxjs';
import { EMPTY } from 'rxjs';
import { templateJitUrl } from '@angular/compiler';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

declare const FB: any;
    
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public cur:User;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private httpService:HttpRequestsService,private router: Router,private socialAuthService:SocialAuthService) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('beitakUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }





    apiAuthenticate(accessToken: string) {
        // authenticate with the api using a facebook access token,
        // on success the api returns an account object with a JWT auth token
        return this.httpService.postHTTPRequest('auth/back/signin',{ accessToken})
        .pipe(map((responseData: User) => {
            this.currentUserSubject.next(responseData);
                //this.startAuthenticateTimer();
                return responseData;
            }));
    }

    
    facebookLogin(returnUrl:String)
    {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
           response=>{
               console.log("Facebook" , response);
               let email=response.email;
               let name =response.name;
               let accessToken=response.authToken;
               let userid=response.id;
               console.log("Facebook Attributes",{ userid,accessToken,email,name})
               this.facebookLoginToBeitak(userid,accessToken,email,name,returnUrl);
           },error =>{console.error(error);
           } 
       );
    }

    facebookLoginToBeitak(userid,accessToken,mail,name,returnUrl)
    {
        return this.httpService.postHTTPRequest('api/user/authsocial/facebook',{ userid,accessToken,mail,name})
               .pipe(map((responseData: any) => {
                       console.log(responseData);
                       //User.authdata = window.btoa(Username + ':' + password);
                       let temp:User=responseData.results;
                       temp.token=responseData.token;
                       localStorage.setItem('beitakUser', JSON.stringify(temp));//JSON.stringify(data));
                       this.currentUserSubject.next(responseData);
                       //////////////////
                       if(returnUrl)  this.router.navigate([returnUrl]);
                       else window.location.reload();
       
               },error=>{console.error("Error for Facebook API",error)})).subscribe();
    }

    public get currentUserValue(): User {
       /* this.cur=new User();
        this.cur.id=1;
        this.cur.name='Omar';
        this.cur.email='osallans@gmail.com';
        */
        
        return  this.currentUserSubject.value;
        //
    }

    login(mail: string, password: string,returnUrl:string) {
        return this.httpService.postHTTPRequest('api/user/authenticate',{ mail,password})
        .pipe(map((responseData: any) => {
                console.log(responseData);
                //User.authdata = window.btoa(Username + ':' + password);
                let temp:User=responseData.results;
                temp.token=responseData.token;
                localStorage.setItem('beitakUser', JSON.stringify(temp));//JSON.stringify(data));
                this.currentUserSubject.next(responseData);
                //////////////////
                if(returnUrl)  this.router.navigate([returnUrl]);
                else window.location.reload();
                

        }));

    }

    register(mail: string, password: string,name:string,mobile:string) {
        return this.httpService.postHTTPRequest('api/user',{ name,mail,password,mobile})
        .pipe(map((responseData: any) => {
                console.log(responseData);
                //User.authdata = window.btoa(Username + ':' + password);
                this.currentUserSubject.next(responseData);

        }));

    }

    
    setPassword(resethash: string, password: string) {
        return this.httpService.postHTTPRequest('api/user/setpassword',{ resethash,password})
        .pipe(map((responseData: User) => responseData));

    }

    
    activateUser(activatehash: String): Observable<any> {
        console.log('api/user/activate?activatehash='+activatehash);
        return this.httpService.postHTTPRequestText('api/user/activate?activatehash='+activatehash,{})
        .pipe(map((responseData: any) => responseData));
    }
     
    sendPassword(mail: String): Observable<any> {

        return this.httpService.postHTTPRequest('api/user/resetpassword',{mail})
        .pipe(map((responseData: any) => responseData));
    }
    changePassword(id:Number,password: string, oldpassword: string): Observable<any> {

        return this.httpService.postHTTPRequest('api/user/'+id+'/changepassword',{ password, oldpassword })
        .pipe(map((responseData: any) => responseData));
    }

    logout() {
        // remove User from local storage to log User out
        localStorage.removeItem('beitakUser');
        try{
            console.log(this.socialAuthService.authState);
            this.socialAuthService.signOut().catch(err => console.error(err));
      
        }
        catch(er)
        {}
        // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
        //FB.api('/me/permissions', 'delete', null, () => FB.logout());
        //this.stopAuthenticateTimer();
        this.currentUserSubject.next(null);
        //this.router.navigate(['home'], {queryParams: {returnUrl: this.router.url},queryParamsHandling: 'merge'})
        window.location.reload();
    }

    // // helper methods
    // private authenticateTimeout;
    
    // private startAuthenticateTimer() {
    //     // parse json object from base64 encoded jwt token
    //     const jwtToken = JSON.parse(atob(this.currentUserValue.accessToken.split('.')[1]));

    //     // set a timeout to re-authenticate with the api one minute before the token expires
    //     const expires = new Date(jwtToken.exp * 1000);
    //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
    //     const { accessToken } = FB.getAuthResponse();
    //     this.authenticateTimeout = setTimeout(() => {
    //         this.apiAuthenticate(accessToken).subscribe();
    //     }, timeout);
    // }

    // private stopAuthenticateTimer() {
    //     // cancel timer for re-authenticating with the api
    //     clearTimeout(this.authenticateTimeout);
    // }
}