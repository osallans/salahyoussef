import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { User } from './shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SalahYoussef';
  currentUser: User;
  itemSelected='';
constructor(private router: Router,
  private titleService: Title,
  private activatedRoute: ActivatedRoute,  
  public authenticationService: AuthenticationService,public translateService:TranslateService) 
{


    ////////////////////////////////////////////////////////////////////
      //Get The routing event to catch the page and highlight the menu items
      router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
       // gtag('config', 'G-RGV00RPSZ9',{page_path: event.urlAfterRedirects});
       /*gtag('event', 'page_view', {
        page_title: '<Page Title>',
        page_location: '<Page Location>',
        page_path: event.urlAfterRedirects,
        send_to: '<GA_MEASUREMENT_ID>'
      }) */
       
        if(event.url.indexOf('home')>-1) this.itemSelected='home';
        else this.itemSelected='home';
        window.scrollTo(0, 0);
        /////////////Changing title
        const rt = this.getChild(this.activatedRoute);  
        rt.data.subscribe(data => {  
          console.log(event);
       console.log(data);
          gtag('event', 'page_view', {
            page_title:data.title,
            page_location: event.url,
            page_path: event.urlAfterRedirects,
            send_to: 'G-RGV00RPSZ9'
          })  
          this.titleService.setTitle(data.title)});  
      }
    
    });
      this.currentUser=this.authenticationService.currentUserValue;

        //this.authenticationService.currentEmployee.subscribe(x => this.currentEmployee = x);
}



/**
   * @description when we navigate from one page to another `scope of js funtions`
   * finished so we have to call it again.
   */
     logout() {
        this.authenticationService.logout();
        this.currentUser=null;
        this.router.navigate(['/home']);
    }

    getChild(activatedRoute: ActivatedRoute) {  
      if (activatedRoute.firstChild) {  
        return this.getChild(activatedRoute.firstChild);  
      } else {  
        return activatedRoute;  
      }  
    
    }  
  }