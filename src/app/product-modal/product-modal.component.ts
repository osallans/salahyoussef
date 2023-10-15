import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
import { ProductService } from '../shared/api/product.service';
import { ShowCaseService } from '../shared/api/showcase.service';
import { Product } from '../shared/models/product.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ModalService } from '../shared/services/modal.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GalleryItem, ImageItem } from 'ng-gallery';
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() modalContentType: string;
  @Input() selectedItem: Product;
  selectedItemImages: String[]=[];
  imgUrl:String;
  items: GalleryItem[];
  imageData:any[]=[];
  constructor(private modalService: ModalService,
    public translateService:TranslateService,public showCaseService:ShowCaseService,
    private spinner: NgxSpinnerService,public authenticationService:AuthenticationService,
    private productService:ProductService,
    private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getImages();
  }
////////////////////////////////////////////////////////////////////////////////////////////
   
goToFBProductShare()
{
 let url=environment.websiteUrl+'/product-detail/'+this.selectedItem.id;
  window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url)+'&t='+document.title, '', 
'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
}
////////////////////////////////////////////////////////////////////////////////////////////
    applyScripts()
    {
      for(var i=0;i<this.selectedItemImages.length;i++)
      {
        let imagepath=this.imgUrl+''+this.selectedItemImages[i];
        this.imageData.push(
        {
          srcUrl: imagepath, 
          previewUrl: imagepath
        });
         
      }
      this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
  
     
    }
//Modal Functions
closeModal() {
  this.modalService.close('Modal Closed!');
}
getImages()
{
  
  this.productService.getProductImagesById(this.selectedItem.id).subscribe((data: any) => {
  this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_productpic;
  
  //this.selectedItemImages.push(this.selectedItem.image);

  for(let i=0;i<data.results.length;i++)
  this.selectedItemImages.push(data.results[i].image);

  this.applyScripts();
},errorResponse => {
    console.error(errorResponse);
});
}
dismissModal() {
  this.modalService.dismiss('Modal Dismissed!');
}
navigateToProductDetail()
{
  
  this.closeModal();
  this.router.navigate(['/product-detail/'+this.selectedItem.id]);
  this.dismissModal();
}
addToShowCase()
{
  this.spinner.show();
  this.showCaseService.addProductToShowCase(this.authenticationService.currentUserValue.id,this.selectedItem.id).subscribe((data: any) => {
    
    let timestamp=new Date().getTime();
    this.showCaseService.cartRefresh.next('refresh_'+timestamp);
    this.spinner.hide();},response => {
    console.error(response);
    this.spinner.hide();
  });
}

}
