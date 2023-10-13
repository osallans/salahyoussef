import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
@Component({
  selector: 'app-activate-link',
  templateUrl: './activate-link.component.html',
  styleUrls: ['./activate-link.component.css']
})
export class ActivateLinkComponent implements OnInit {

  filterParam : String;
  constructor(
    public translateService:TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private notifyService:NotifyService) { }

  ngOnInit(): void {
    this.filterParam = (this.route.snapshot.paramMap.get('activatehash'));
      if(this.filterParam)
    {
      this.authenticationService.activateUser(this.filterParam).subscribe((data: any) => {
        this.spinner.hide();
        this.notifyService.onSuccess(this.translateService.instant('account_activated'),this.translateService.instant('success'));
        this.router.navigate(['/home']);
      },response => {
        console.log('response',response);
        if(response.indexOf('200')>-1)
        {
          this.spinner.hide();
          this.notifyService.onSuccess(this.translateService.instant('account_activated'),this.translateService.instant('success'));
          this.router.navigate(['/home']);
        }
        else{
            console.error(response);
            this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
            this.router.navigate(['/home']);
            this.spinner.hide();
        }
       });
    }
  }

}
