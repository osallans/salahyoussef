import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

import { StoreService } from '../shared/api/store.service';
import { Branch } from '../shared/models/branch.model';
import { Store } from '../shared/models/store.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductSearch } from '../shared/models/productsearch.model';
import { ProductService } from '../shared/api/product.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';

//import { google } from '@angular/google-maps';
@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {
  store: Store;
  imgUrl:String;
  isShown:boolean=false;
  storeImageUrl:String;
  storeImages : String[]=[];
  branch : Branch;
  filterParam : Number;  
  storeid:number;
  constructor(public storeService:StoreService,
    private authService:AuthenticationService,
    private spinner: NgxSpinnerService,
    public translateService: TranslateService,private router:Router,
    public notifyService:NotifyService,
     private route: ActivatedRoute) { 
      
     }

  ngOnInit(): void {
    this.filterParam = Number(this.route.snapshot.paramMap.get('id'));
    
   // this.router.navigate(['not-found'], {queryParams: {},queryParamsHandling: 'merge'})
  
    if(!this.authService.currentUserValue || !this.authService.currentUserValue.token )  
    {
      
      this.translateService.get('not_loggedin').subscribe((translated: string) => {
        this.notifyService.onError(this.translateService.instant('not_loggedin'),this.translateService.instant('error'));
       this.router.navigate(['home'], {queryParams: {returnUrl: this.router.url},queryParamsHandling: 'merge'})
      });
     }
    else
    {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let userDate=new Date(this.authService.currentUserValue.activateexpiry);
       if(userDate.getTime()>yesterday.getTime())
       {
        this.notifyService.onError(this.translateService.instant('not_activated'),this.translateService.instant('error'));
        this.router.navigate(['home'], {queryParams: {},queryParamsHandling: 'merge'})
       }
    }
    
    if(!this.filterParam) this.router.navigate(['stores-list'], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
     this.loadBranch((Number(this.filterParam)));
  }
  ////////////////////////////////////////////////////////////////
  loadBranch(id:Number)
  {
    this.spinner.show();
    console.log("Branch",id);
      
    this.storeService.getBranchById(id).subscribe((data: any) => {
      console.log("Branch",data);
      this.storeImageUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats?.imagepath_store;
      
      this.spinner.hide();
      this.branch=data.results?data.results:data;
     },response => {
          console.error(response);
          this.spinner.hide();
     });


    }
 ////////////////////////////////////////
 insertCount() {
  this.storeService.postBranchUsage(this.branch.id).subscribe((data: any) => {
    console.log("Branch",data);
    },response => {
        console.error(response);
    });
    this.isShown = ! this.isShown;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
    applyScripts()
    {
      if (document.getElementById('main_gallery_js') !=null) {document.getElementById('main_gallery_js').remove();}
      const node = document.createElement('script');
      node.src = 'assets/js/main_gallery.js';
      node.type = 'text/javascript';
      node.async = false;
      node.id = 'main_gallery_js';
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  }