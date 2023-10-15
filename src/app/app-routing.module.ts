import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './shared/services/auth.guard';
import { LoginComponent } from './login/login.component';

import { ChangePasswordComponent } from './change-password/change-password.component';

import { ProductsListComponent } from './products-list/products-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateLinkComponent } from './activate-link/activate-link.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ShowCasesComponent } from './show-cases/show-cases.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ContactComponent } from './contact/contact.component';
import { ShowCaseComponent } from './show-case/show-case.component';
import { AllShowcasesComponent } from './all-showcases/all-showcases.component';
import { PromotionsListComponent } from './promotions/promotions/promotions.component';
import { BlogComponent } from './blog/blog.component';
import { BComponent } from './b/b.component';
import { ArticleComponent } from './article/article.component';
import { PrivacyComponent } from './privacy/privacy.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' },
  
  { path: 'home', component: HomeComponent,data: { title: 'Home' ,animation: 'home' } },
  { path: 'contact', component: ContactComponent,data: {title: 'Contact' , animation: 'contact' } },
  { path: 'all-showcases', component: AllShowcasesComponent,data: {title: 'All Showcases' , animation: 'all-showcases' } },
  { path: 'activate-link/:activatehash', component: ActivateLinkComponent,data: { animation: 'activate-link' } },
  { path: 'favourites', component: FavouritesComponent,data: {title: 'Favourites' , animation: 'favourites' } },
  { path: 'show-cases', component: ShowCasesComponent,canActivate: [AuthGuard],data: {title: 'Showcases' , animation: 'show-cases' } },
  { path: 'show-case/:id', component: ShowCaseComponent,canActivate: [AuthGuard],data: {title: 'Showcase' , animation: 'show-case' } },
  { path: 'set-password/:resethash', component: SetPasswordComponent,data: {title: 'Set Password' , animation: 'set-password' } },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthGuard],data: {title: 'Change Password' , animation: 'change-password' } },
  { path: 'reset-password', component: ResetPasswordComponent,data: { animation: 'reset-password' } },
  { path: 'register', component: RegisterComponent,data: {title: 'Register' , animation: 'register' } },
  { path: 'about', component: AboutComponent,data: {title: 'Blog' , animation: 'transactions' } },
  { path: 'promotions', component: PromotionsListComponent,data: { title: 'Promotions' ,animation: 'promotions' } },
  { path: 'blog', component: BlogComponent,data: { title: 'Blogs' ,animation: 'blog' } },
  { path: 'article/:id', component: ArticleComponent, data: {title: 'Blog Detail' , animation: 'article' } },
  { path: 'faq', component: FaqComponent,data: {title: 'FAQ' , animation: 'transactions' } },
  { path: 'products-list', component: ProductsListComponent, data: {title: 'Products List' , animation: 'transactions' } },
  { path: 'product-detail/:id', component: ProductDetailComponent, data: {title: 'Product Detail' , animation: 'transactions' } },
  { path: 'stores-list', component: StoresListComponent, data: {title: 'Stores' , animation: 'transactions' } },
  { path: 'store-detail/:id', component: StoreDetailComponent, data: {title: 'Store Detail' , animation: 'transactions' } },
  { path: 'b/:id', component: BComponent, data: { animation: 'b' } },
  { path: 'privacy', component: PrivacyComponent,data: {title: 'Privacy' , animation: 'privacy' } },
  { path: '', redirectTo: 'home', pathMatch: 'full',  data: {title: 'Home' , animation: 'home' } } ,
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];


//export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
