import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
@Injectable({
  providedIn: "root"
})
export class NotifyService {

  constructor(private snotifyService: SnotifyService) { }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: false,
        maxAtPosition: 6,
        maxOnScreen: 8
      }
    });
    return {
      bodyMaxLength: 300,
      titleMaxLength: 20,
      backdrop: -1,
      position: SnotifyPosition.centerTop,
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
  }

  //This message will be invoked to display the succsess of certain procedure
  onSuccess(body, title) {
    this.snotifyService.success(body, title, this.getConfig());
  }
  //This message will be invoked to display any info
  onInfo(body, title) {
    this.snotifyService.info(body, title, this.getConfig());
  }
  //This message will be invoked to display the failure of certain procedure
  onError(body, title) {
    this.snotifyService.error(body, title, this.getConfig());
  }
  //This message will be invoked to display any warning
  onWarning(body, title) {
    this.snotifyService.warning(body, title, this.getConfig());
  }


  //This message will be invoked when loading any data
  onLoad(body, title) {

    const icon = "assets/images/preloader.gif";
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    config.position = SnotifyPosition.centerCenter;
    let id = this.snotifyService.simple(body, title,
      {
        backdrop: 0.8,
        position: SnotifyPosition.centerCenter,
        timeout: 400000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true
        ,
        icon: icon
      });
    return id;
  }

  //This message will be invoked when finishing loading
  onLoadCompelete(id) {
    this.snotifyService.remove(id,true)
  }

  //This message will be invoked to ask use to confirm something
  onConfirmation(body, title, invoker, yesAction, noAction, yesParameter = null) {
    /*
    Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    config.backdrop = 0.5;
    config.position = SnotifyPosition.centerCenter;
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        {
          text: 'Yes', action: (toast) => {
            this.snotifyService.remove(toast.id);
            if(yesAction)
            if (yesParameter)
              invoker[yesAction](yesParameter);
            else
              invoker[yesAction]();
          }, bold: false
        },
        {
          text: 'No', action: (toast) => {
            this.snotifyService.remove(toast.id);
            if (noAction)
              invoker[noAction]();
          }
        },
        // {text: 'Close', action: (toast) => {console.log('Clicked: Close'); this.snotifyService.remove(toast.id); }, bold: true},
      ]

    });
  }

}
