import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/api/category.service';
import { StoreService } from '../shared/api/store.service';
import { LookupService } from '../shared/api/lookup.service';
import { ProductService } from '../shared/api/product.service';
import { Category } from '../shared/models/category.model';
import { Product } from '../shared/models/product.model';
import { ProductSearch } from '../shared/models/productsearch.model';
import { Room } from '../shared/models/room.model';
import { Store } from '../shared/models/store.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { Banner } from '../shared/models/banner.model';
import { GalleryItem, ImageItem } from 'ng-gallery';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: Product[] = []; 
  discountProducts: Product[] = []; 
  categories: Category[] = [];
  productSearch: ProductSearch;
  rooms: Room[] = [];
  bannersUrl:String;
  stores: Store[] = [];
  banners:Banner[]=[];
  imgUrl :String;
  items: GalleryItem[];
  imageData:any[]=[];
  returnUrl:String;
  constructor( 
    public authenticationService: AuthenticationService,
    private categoryService:CategoryService,
    private spinner: NgxSpinnerService,
    public storeService: StoreService,public translateService:TranslateService,
    public productService: ProductService,public notifyService: NotifyService,
    public lookupService:LookupService,public router:Router) { }

  ngOnInit() {
   
    this.loadBanners();
    //this.loadRooms();
  } 
  loadBanners()
  {
    this.spinner.show();
    // this.lookupService.getBannerList().subscribe((data: any) => {
    //   this.banners=data.results;
    //   this.bannersUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_adsbanner;
    //   this.applyScripts();
     
    //   this.spinner.hide();
    //   },response => {
    //     this.spinner.hide();
    //   });
      this.spinner.hide();
  }
  

  loadRooms()
  {

    //this.spinner.show();
    // this.lookupService.getRoomsList().subscribe((data: any) => {
    // this.rooms=data;
   // this.getPopularProducts();
  //this.getDiscountProducts();},response => {});
  }
  
  goToPage(type,id) {
    this.router.navigate(['/products-list'], { queryParams: { filterParam: type+"_"+id } });
  }
  // getPopularProducts()
  // {
  //   let tempSearch=new ProductSearch();
  //   tempSearch.isfeatured=1;

   
  //   this.productService.getRandomProducts(tempSearch).subscribe((data: any) => {
  //     this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_product;
      
  //   //   //this.notifyService.onLoadCompelete(loadID);
  //   //   //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");data=response;
  //      this.popularProducts=data.results;
  //      //this.loadBanners();
  //       },response => {
  //         console.log(response);
  //      });
    
  // }

  // getDiscountProducts()
  // {
  //   let tempSearch=new ProductSearch();
  //   tempSearch.specialoffers=1;

   
  //   this.productService.getRandomProducts(tempSearch).subscribe((data: any) => {
  //     this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_product;
      
  //   //   //this.notifyService.onLoadCompelete(loadID);
  //   //   //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");data=response;
  //      this.discountProducts=data.results;
  //       },response => {
  //         console.log(response);
  //      });
    
  // }

    ////////////////////////////////////////////////////////////////////////////////////////////
    applyScripts()
    {
      for(var i=0;i<this.banners.length;i++)
      {
        let imagepath=this.bannersUrl+''+this.banners[i].image;
        this.imageData.push(
        {
          srcUrl: imagepath, 
          previewUrl: imagepath,
          title: this.banners[i].title,
          titlear: this.banners[i].titlear,
          desc: this.banners[i].desc,
          descar: this.banners[i].descar,
        });
         
      }
      this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, 
        thumb: null,
        title:item.title,
        titlear:item.titlear,
        desc:item.desc,
        descar:item.descar
      }));
      
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
/*
            <div  class="container-fluid">

                <div class="owl-slider owl-carousel owl-theme" data-autoplay="true">

                    <!--Slide item-->

                    <div *ngFor="let item of banners" class="item d-flex align-items-center" 
                    style="background-image:url({{bannersUrl+item.image}})">
                        <div class="container">
                            <div class="caption">
                                <div class="promo text-center">
                                    <div class="animated" data-start="fadeInUp">
                                        <div class="title title-sm p-0">{{(translateService.currentLang=='ar')?item.titlear:item.title}}</div>
                                    </div>
                                    <div class="animated" data-start="fadeInUp">
                                        {{(translateService.currentLang=='ar')?item.descar:item.desc}}
                                    </div>
                                    <!--
                                    <div class="animated" data-start="fadeInUp">
                                        <a href="#" target="_blank" class="btn btn-light">New collection</a>
                                        <a href="#" target="_blank" class="btn btn-outline-light"> Get first discount</a>
                                    </div>
                                -->
                                </div>
                            </div>
                        </div>
                    </div>

                </div> <!--/owl-slider-->
            </div>
            */