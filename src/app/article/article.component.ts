import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import { LookupService } from '../shared/api/lookup.service';
import { Blog } from '../shared/models/blog.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  
  blog: Blog;
  blogImageUrl:string;
  filterParam : Number;  
  // google maps zoom level
  blogid:number;
  

  constructor(public lookupService:LookupService,
    private spinner: NgxSpinnerService,
    public translateService: TranslateService,private router:Router,
     private route: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.filterParam = Number(this.route.snapshot.paramMap.get('id'));
    if(!this.filterParam)
      this.router.navigate(['blog'], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
      this.blogid=Number(this.filterParam);
      this.loadBlog((this.blogid));
  }

  loadBlog(id:Number)
  {
    this.spinner.show();
    this.lookupService.getBlog(id).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      this.blogImageUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+ 
      ((data.stats&&data.stats.imagepath_blog)?data.stats.imagepath_blog:"/uploads/blog/");
      data.body=data.body.replaceAll('<img','<img class="img-fluid"');
      data.bodyar=data.bodyar.replaceAll('<img','<img class="img-fluid"');
      console.log(data.body);
      this.blog=data;
     },response => {
          if(response=='Not Found')
          this.router.navigate(['not-found'], {queryParams: {},queryParamsHandling: 'merge'})
          console.error(response);
          this.spinner.hide();
     });


    }

}
