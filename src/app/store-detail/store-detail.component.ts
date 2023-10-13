import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

import { StoreService } from '../shared/api/store.service';
import { Branch } from '../shared/models/branch.model';
import { Store } from '../shared/models/store.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductSearch } from '../shared/models/productsearch.model';
import { ProductService } from '../shared/api/product.service';
import { Product } from '../shared/models/product.model';
import { Style } from '../shared/models/style.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { google } from '@angular/google-maps';
@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  imgUrl:String;
  storeImages : String[]=[];
  branches : Branch[]=[];
  storeStyles:Style[]=[];
  storeImageUrl:string;
  filterParam : Number;  
  lat = 30.4353088;
  lng = 30.2714005;
  markers: marker[] = []
  popularProducts : Product[]=[];
  // google maps zoom level
  zoom: number = 8;
  storeid:number;
  //map: google.maps.Map;
  fbUrl:SafeResourceUrl='';
  constructor(public storeService:StoreService,
    private spinner: NgxSpinnerService,private productService:ProductService,
    public translateService: TranslateService,private router:Router,
     private route: ActivatedRoute,private sanitizer: DomSanitizer) { 
      
     }

  ngOnInit(): void {
    this.filterParam = Number(this.route.snapshot.paramMap.get('id'));
      if(!this.filterParam)
        this.router.navigate(['stores-list'], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
        let url='https://www.facebook.com/plugins/share_button.php?href='+encodeURIComponent(environment.websiteUrl+'/store-detail/'+this.filterParam)+'&layout=button&size=small&appId='+environment.facebookAppId+'&width=67&height=20';
        this.fbUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.storeid=Number(this.filterParam);
        this.loadstore((this.storeid));
        this.getPopularProducts();
        this.loadStoreStyles(this.storeid);
  }
////////////////////////////////////////////////////////////////
loadStoreStyles(id:Number)
{
  this.storeService.getStoreStyles(id.valueOf()).subscribe((data: any) => {
    this.storeStyles=data.results?data.results:data;
  },response => {
    console.error(response);
  });
}

getPopularProducts()
{
  let tempSearch=new ProductSearch();
  tempSearch.isactive=1;
  tempSearch.orderdir="asc";
  tempSearch.orderfield="name";
  tempSearch.page=1;
  tempSearch.pagesize=4;
  tempSearch.storeid=this.filterParam.valueOf();
 
  this.productService.getProducts(tempSearch).subscribe((data: any) => {
    this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_product;
  //   //this.notifyService.onLoadCompelete(loadID);
  //   //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");data=response;
     this.popularProducts=data.results;
      },response => {
        console.log(response);
     });
  
}

goToStoreProducts() {
   this.router.navigate(['/products-list'], { queryParams: { filterParam: "store_"+this.storeid } });
}
  ////////////////////////////////////////////////////////////////
  loadstore(id:Number)
  {
    this.spinner.show();
    this.storeService.getStoreById(id).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
  
      this.storeImageUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_store;
      this.store=data.results;
      
      console.log(data);
      this.getBranches(this.store.id);
        },response => {
          if(response=='Not Found')
          this.router.navigate(['not-found'], {queryParams: {},queryParamsHandling: 'merge'})
  
          console.error(response);
          this.spinner.hide();
     });


    }
  
    getBranches(id:Number)
    {
      this.storeService.getBranchesById(id).subscribe((data: any) => {
        this.branches=data;
        for(var i=0;i<this.branches.length;i++)
        {
          this.markers.push({lat: Number(this.branches[i].lat),lng: Number(this.branches[i].lang),
            label:''// this.translateService.currentLang=='ar'?this.branches[i].districtnamear:this.branches[i].districtname
            ,draggable: false})
        }
        this.applyScripts();
          },response => {
            console.error(response);
       });
  
  
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