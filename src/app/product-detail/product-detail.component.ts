import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
import { ProductService } from '../shared/api/product.service';
import { StoreService } from '../shared/api/store.service';
import { Product } from '../shared/models/product.model';
import { Store } from '../shared/models/store.model';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../shared/services/authentication.service';
import { FavouriteService } from '../shared/api/favourite.service';
import { NotifyService } from '../shared/services/notify.service';
import { ShowCasesComponent } from '../show-cases/show-cases.component';
import { ShowCaseService } from '../shared/api/showcase.service';
import { Style } from '../shared/models/style.model';
import { Branch } from '../shared/models/branch.model';
import { Room } from '../shared/models/room.model';
import { Comb } from '../shared/models/comb.model';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  store :Store;
  imgUrl:string;
  storeImgUrl:string;
  favouriteItems:Product[]=[];
  productImages : String[]=[];
  storeStyles:Style[]=[];
  storeBranches:Branch[]=[];
  productStyles:Style[]=[];
  productCombs:Comb[]=[];
  productRooms:Room[]=[];
  productBranches:Branch[]=[];
  filterParam : Number;
  items: GalleryItem[];
  imageData:any[]=[];
  fbProductUrl:SafeResourceUrl='';
  fbStoreUrl:SafeResourceUrl='';
  constructor(public productService:ProductService,public authenticationService:AuthenticationService,
    public notifyService:NotifyService,public showCaseService:ShowCaseService,
    private spinner: NgxSpinnerService,private favouriteService:FavouriteService,private sanitizer:DomSanitizer,
    private storeService:StoreService,private translateService: TranslateService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filterParam = Number(this.route.snapshot.paramMap.get('id'));
      if(this.filterParam)
        this.loadProduct((this.filterParam)); 
      else
        this.router.navigate(['products-list'], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
      this.loadFavourites();

  }
  addToShowCase()
  {
    this.spinner.show();
    this.showCaseService.addProductToShowCase(this.authenticationService.currentUserValue.id,this.product.id).subscribe((data: any) => {
      
      let timestamp=new Date().getTime();
      this.showCaseService.cartRefresh.next('refresh_'+timestamp);
      this.spinner.hide();},response => {
      console.error(response);
      this.spinner.hide();
    });
  }
  loadFavourites()
  {
    if(this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.id)
    {
      this.favouriteService.getProducts(this.authenticationService.currentUserValue.id).subscribe((data: any) => 
      {this.favouriteItems=data.results;},response => {console.error(response)});
    }
  }
  checkInFavourites(id):boolean
  {
    for(var i=0;i<this.favouriteItems.length;i++)
    {
      if(this.favouriteItems[i].id==id) return true;
    }
    return false;
  }
  toggleFavourite(id)
  {
    this.spinner.show();
    if(!this.checkInFavourites(id))
    {
        this.favouriteService.addProduct(this.authenticationService.currentUserValue.id,id)
        .subscribe((data: any) => {
          this.loadFavourites();
          this.spinner.hide();
        },response => {
          console.error(response);
          
          this.spinner.hide();
        });
    }

    else
    {
        this.favouriteService.removeProduct(this.authenticationService.currentUserValue.id,id)
        .subscribe((data: any) => {
          this.loadFavourites();
          this.spinner.hide();
        },response => {
          console.error(response);
          this.spinner.hide();
        });
    }
  }

  loadProduct(id:Number)
  {
    
    
      this.spinner.show();
    this.productService.getProductById(id).subscribe((data: any) => {
      console.log(data);
      this.product=data;
      
      /////////////////////FB Links///////////////////////
      // let producturl='https://www.facebook.com/plugins/share_button.php?href='+encodeURIComponent(environment.websiteUrl+'/product-detail/'+this.product.id)+'&layout=button&size=small&appId='+environment.facebookAppId+'&width=67&height=20';
      // this.fbProductUrl=this.sanitizer.bypassSecurityTrustResourceUrl(producturl);
      // let storeurl='https://www.facebook.com/plugins/share_button.php?href='+encodeURIComponent(environment.websiteUrl+'/store-detail/'+this.product.storeid)+'&layout=button&size=small&appId='+environment.facebookAppId+'&width=67&height=20';
      // this.fbStoreUrl=this.sanitizer.bypassSecurityTrustResourceUrl(storeurl);
        
      ////////////////////////////////////////////////////
    this.getProductImages(this.product.id);
      //this.getStoreById(this.product.storeid);
      this.spinner.hide();
        },response => {
          this.spinner.hide();
         if(response=='Not Found')
          this.router.navigate(['not-found'], {queryParams: {},queryParamsHandling: 'merge'})
     });


    
  /////////////////////////////////////////
  // this.productService.getProductRooms(id).subscribe((data: any) => {
  //     this.productRooms=data.results?data.results:data;},response => {console.error(response);});
      
  // this.productService.getProductBranches(id).subscribe((data: any) => {
  //       this.productBranches=data.results?data.results:data;
  //       console.log(this.productBranches);
  //       for(let i=0;i<this.productBranches.length;i++)
  //       {  this.productBranches[i].name=this.productBranches[i].district_name+((this.productBranches[i].address)?"("+this.productBranches[i].address+")":"");
  //       this.productBranches[i].namear=this.productBranches[i].district_namear+((this.productBranches[i].addressar)?"("+this.productBranches[i].addressar+")":"");
  //       }
  //     },response => {console.error(response);});
  
  // this.productService.getProductStyles(id).subscribe((data: any) => {
  //     this.productStyles=data.results?data.results:data;},response => {console.error(response);});

  // this.productService.getProductCombs(id).subscribe((data: any) => {
  //   this.productCombs=data.results?data.results:data;},response => {console.error(response);});
}

getProductImages(id)
{
    //////////////////////
    this.productService.getProductImagesById(id).subscribe((data: any) => {
    this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_productpic;
    //this.productImages.push(this.imgUrl+this.product.image);

    for(let i=0;i<data.results.length;i++)
    this.productImages.push(environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_productpic+data.results[i].image);//data.results[i].image);
    console.log(this.productImages);  
    this.applyScripts();
  }
  ,response => { console.error(response);
  
    this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
  });
}
////////////////////////////////////////////////////////////////////////////////
// getStoreById(id)
// {
//   this.storeService.getStoreById(id).subscribe((data: any) => {
//     this.storeImgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_store;
//     this.store=data.results?data.results:data;
//       },response => {
//         console.error(response);
//    });

//    this.storeService.getBranchesById(id).subscribe((data: any) => {
//     this.storeBranches=data.results?data.results:data;
//     console.log(this.storeBranches);
//   },response => {
//     console.error(response);
// });

// this.storeService.getStoreStyles(id).subscribe((data: any) => {
//   this.storeStyles=data.results?data.results:data;
// },response => {
//   console.error(response);
// });
// }

scroll() {
  let el = document.getElementById('storesection');
  el.scrollIntoView({behavior: 'smooth'});
}
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  applyScripts()
  {

    
  for(var i=0;i<this.productImages.length;i++)
    {
      
      this.imageData.push(
      {
        srcUrl: this.productImages[i], 
        previewUrl: this.productImages[i]
      });
       
    }
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

     /*
    if (document.getElementById('main_gallery_js') !=null) {document.getElementById('main_gallery_js').remove();}
    const node = document.createElement('script');
    node.src = 'assets/js/main_gallery.js';
    node.type = 'text/javascript';
    node.async = false;
    node.id = 'main_gallery_js';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    */
  }
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
}
