import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { first } from 'rxjs/operators';
import { CategoryService } from '../shared/api/category.service';
import { LookupService } from '../shared/api/lookup.service';
import { StoreService } from '../shared/api/store.service';
import { Category } from '../shared/models/category.model';
import { Room } from '../shared/models/room.model';
import { Store } from '../shared/models/store.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ShowCaseService } from '../shared/api/showcase.service';
import { Product } from '../shared/models/product.model';
import { environment } from 'src/environments/environment';
import { Style } from '../shared/models/style.model';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @ViewChild('floatingDiv') floatingDiv: ElementRef;
  error = '';
  imgUrl='';
  isActive:boolean=true;
  languageHolder='';
  categories: Category[] = [];
  rooms: Room[] = [];
  styles:Style[] = [];
  stores: Store[] = [];
  cartItems : Product[]=[];
   constructor(
       
        private route: ActivatedRoute,
        private router: Router,
        public authenticationService: AuthenticationService,
        private notifyService : NotifyService,
        private categoryService:CategoryService,
        private ShowCaseService:ShowCaseService,
        public storeService: StoreService,
        public lookupService:LookupService,
        public translateService:TranslateService,
        private spinner: NgxSpinnerService,
        private socialAuthService:SocialAuthService,
    ) { 
      //this.authenticationService.logout();
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }
submitShowCase()
{}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
      console.log("1",this.returnUrl);
      
  });
    this.ShowCaseService.cartRefresh.subscribe((value) => {
     this.loadCart();
    });
    //////////////////////////////////////////////////////////////////
    // choosing language
    if(!this.translateService.currentLang)
    {
      if(localStorage.getItem('language'))//JSON.stringify(data));
       {
            this.translateService.use(localStorage.getItem('language'));
            this.languageHolder=localStorage.getItem('language')=='en'?'ENG':'عربي';
        }
       else
       {
           this.translateService.setDefaultLang('en');
           this.languageHolder='ENG';
      }
   }   
   ///////////////////////////////////////////////////////////////////////
    this.loginForm = new FormGroup({
        username:new FormControl('', []),
        password: new FormControl('', [])
    });
    
    this.loadCategories();
    //this.loadCart();
}

loadCart()
{
  if(!this.authenticationService.currentUserValue) return;
  this.ShowCaseService.getShowCaseProducts(this.authenticationService.currentUserValue.id).subscribe((data: any) => {
   this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+'/uploads/product/';
   this.cartItems=data.results?data.results:data;},response => {});
}
removeProductFromCart(productId:number)
{
  this.spinner.show();
  
  this.ShowCaseService.removeProductToShowCase(this.authenticationService.currentUserValue.id,productId).subscribe((data: any) => {
  this.spinner.hide();
  this.loadCart();
  this.notifyService.onSuccess(this.translateService.instant('success'),this.translateService.instant('success'));
  }
  ,response => {
    this.spinner.hide();
    this.notifyService.onError(this.translateService.instant('error'),this.translateService.instant('error'));
    
  });

}
loadCategories()
{
  this.categoryService.getCategoriesList().subscribe((data: any) => {this.categories=data.results?data.results:data;},response => {});
}


goToPage(type,id) {
  this.floatingDiv.nativeElement.classList.remove('expanded');
  if(type=='store') this.router.navigate(['/store-detail/'+id], {}); 
  else this.router.navigate(['/products-list'], { queryParams: { filterParam: type+"_"+id } });
}

switchLanguage(language: string) {
  this.translateService.use(language);
  localStorage.setItem('language',language);
      
}




loginWithFacebook(): void {
  this.socialAuthService.signOut();
        
this.authenticationService.facebookLogin(this.returnUrl);
}
// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

formField(fieldName: string) {
    return this.loginForm.get(fieldName);
  }
logout()
{
  this.authenticationService.logout();
}
onSubmit(loginForm: any) {
    console.log(loginForm);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

   //let loadId = this.notifyService.onLoad("Signing in... Please wait.", "Loading").id;
   this.spinner.show();
    this.authenticationService.login(this.f.username.value, this.f.password.value,this.returnUrl)
        .pipe(first())
        .subscribe(
            data => {
                this.loginForm.reset();
                this.spinner.hide();
                this.router.navigate([this.returnUrl]);
                //this.notifyService.onLoadCompelete(loadId);
                //this.router.navigate([this.returnUrl]);
            },
            error => {
              this.spinner.hide();
              //this.loginForm.reset();
                
              //this.notifyService.onLoadCompelete(loadId);
              this.notifyService.onError(this.translateService.instant('login_error'),this.translateService.instant('error'));
             
            });


          }

        }
