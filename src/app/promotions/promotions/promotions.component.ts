import { ElementRef, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { StoreService } from 'src/app/shared/api/store.service';
import { StoreSearch } from 'src/app/shared/models/storesearch.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/user/user.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})

export class PromotionsListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('popUp') popUp: ElementRef;
  @ViewChild('promotionPopup', { static: false }) promotionModalTemplate: TemplateRef<any>;
  
 
  promotionItems: Promotion[] = [];
  imgUrl: String;
  promotionsCount: Number;
  config: any;
  promotionSearch:StoreSearch;
  pageOfItems: Array<any>;
  pageEvent: PageEvent;

  constructor(public translateService:TranslateService,    
    private spinner: NgxSpinnerService,
    private storeService:StoreService,
    public authenticationService:AuthenticationService,
    public userService:UserService,
    public notifyService:NotifyService,
    private router:Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
 
    this.initializepromotionSearch();
    /////////////////////////////////////////
    this.route.queryParams.subscribe(params => {
      this.initializepromotionSearch();
      /////////////////////////////////////////
      this.loadpromotions();
      console.log(this.authenticationService.currentUserValue)
      //this.router.navigate([], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
    });

    
  }

  orderCard()
  {
    
    this.spinner.show();
    this.userService.orderCard(this.authenticationService.currentUserValue.id).subscribe((data: any) => {
       console.log(data);
       this.notifyService.onSuccess(this.translateService.instant('card_success'),this.translateService.instant('success'));
   
       this.spinner.hide();
      },response => {
        this.spinner.hide();
        this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
   
          console.error(response);
     });
  }
 
  initializepromotionSearch()
  { 
    this.promotionSearch=new StoreSearch();
    this.promotionSearch.isactive=1;
    this.promotionSearch.page=1;
    this.promotionSearch.pagesize=10000;
    
  }

  //-----------------------------------------------------------------------------------------------------
  loadpromotions()
  {
    this.spinner.show();
   this.storeService.getPromotions(this.promotionSearch).subscribe((data: any) => {
      console.log(data.results);
      //this.promotionItems=data.results;
      this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+(data.stats.imagepath_store?data.stats.imagepath_store:'');
      this.promotionItems=data.results?data.results:data;
      this.spinner.hide();
       },response => {
        this.spinner.hide();
        
          console.error(response);
     });
  }

}