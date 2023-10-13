import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { NotifyService } from './shared/services/notify.service';
import { DatePipe } from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { UserService } from './user/user.service';
import { HttpRequestsService } from './shared/services/http-request.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/services/modal.service';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BasicAuthInterceptor } from './shared/services/basic-auth.interceptor';
import { ErrorInterceptor } from './shared/services/error.interceptor';
import { CompanyService } from './company/company.service';
import { NumbersOnly } from './shared/commonFunctions/numbersOnly.directive';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyTierAddComponent } from './company-tier/company-tier-add/company-tier-add.component';
import { CompanyTierListComponent } from './company-tier/company-tier-list/company-tier-list.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CompanyTierService } from './company-tier/company-tier.service';
import { EmployeeService } from './employee/employee.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionLogComponent } from './transaction/transaction-log/transaction-log.component';
import { TransactionService } from './transaction/transaction.service';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/confirmation-dialog/confirmation-dialog.service';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { appInitializer } from './shared/services/app.intitializer';
import {MatSliderModule} from '@angular/material/slider';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductService } from './shared/api/product.service';
import { CategoryService } from './shared/api/category.service';
import { NgxPaginationModule, PaginatePipe, PaginationControlsDirective } from 'ngx-pagination';
import { LookupService } from './shared/api/lookup.service';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { StoreService } from './shared/api/store.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateLinkComponent } from './activate-link/activate-link.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ShowCasesComponent } from './show-cases/show-cases.component';
import { ShowCaseService } from './shared/api/showcase.service';
import { ShowCaseComponent } from './show-case/show-case.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { FavouriteService } from './shared/api/favourite.service';
import { AgmCoreModule } from '@agm/core';
import { ContactComponent } from './contact/contact.component';
import { AllShowcasesComponent } from './all-showcases/all-showcases.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PromotionsListComponent } from './promotions/promotions/promotions.component';
import { SocialAuthService, FacebookLoginProvider, SocialUser, SocialAuthServiceConfig } from 'angularx-social-login';
import { GalleryModule } from 'ng-gallery';
import { BlogComponent } from './blog/blog.component';
import { BComponent } from './b/b.component';
import { ArticleComponent } from './article/article.component';
import { PrivacyComponent } from './privacy/privacy.component';


export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NumbersOnly,
    LoginComponent,
    CompanyListComponent,
    CompanyAddComponent,
    CompanyTierAddComponent,
    CompanyTierListComponent, 
    EmployeeAddComponent,
    EmployeeListComponent,
    ChangePasswordComponent,
    ConfirmationDialogComponent,
    TransactionListComponent,
    TransactionLogComponent,
    ConfirmationDialogComponent,
    TopMenuComponent,
    ProductsListComponent,
    StoresListComponent,
    NotFoundComponent,
    ProductDetailComponent,
    StoreDetailComponent,
    ProductModalComponent,
    AboutComponent,
    FaqComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ActivateLinkComponent,
    SetPasswordComponent,
    ShowCasesComponent,
    ShowCaseComponent,
    FavouritesComponent,
    ContactComponent,
    AllShowcasesComponent,
    PromotionsListComponent,
    BlogComponent,
    BComponent,
    ArticleComponent,
    PrivacyComponent
  ],
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    GalleryModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSliderModule,
    NgxSliderModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwZ33HZAvQkJTXoc0V0Blco4spjeql5gg'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    

    SnotifyModule.forRoot()
    ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    NotifyService,
    Title,
    UserService,
    ConfirmationDialogService,
    TransactionService,
    EmployeeService,
    FavouriteService,
    CompanyTierService,
    ShowCaseService,
    CompanyService,DatePipe,
    ModalService, 
    ProductService,
    CategoryService,
    LookupService,
    StoreService,
    
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    HttpRequestsService,
    { provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            '815966422339626'
          )
        }
      ]
    } as SocialAuthServiceConfig
  },
  SocialAuthService
  ], 
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent] 
})

export class AppModule { }
