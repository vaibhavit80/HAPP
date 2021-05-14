import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(TrackingService) public trackService: TrackingService) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
  logout(){
    localStorage.setItem('user', 'dummyUser');
    this.trackService.demoregister().subscribe(data => {
      // tslint:disable-next-line: no-debugger
        if (data.Error === true)
        { 
          localStorage.setItem('AuthToken', null);
          localStorage.setItem('IsLogin', 'false');
          localStorage.setItem('user', null);
          localStorage.setItem('currPage', 'rp');
          this.navCtrl.navigateForward(`/login`);
          
        }
        if (data && data.ResponseData.AccessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('AuthToken', data.ResponseData.AccessToken.Token);
          localStorage.setItem('user', 'dummyUser');
          localStorage.setItem('expires', data.ResponseData.AccessToken.Expires);
          localStorage.setItem('IsLogin', 'true');
          this.trackService.setLatestPackages();
         
        }
        else {
          localStorage.setItem('AuthToken', null);
          localStorage.setItem('IsLogin', 'false');
          localStorage.setItem('user', null);
          localStorage.setItem('currPage', 'rp');
          this.navCtrl.navigateForward(`/login`);
        }
    },
    error => {
      localStorage.setItem('AuthToken', null);
      localStorage.setItem('IsLogin', 'false');
      localStorage.setItem('user', null);
      localStorage.setItem('currPage', 'rp');
      this.navCtrl.navigateForward(`/login`);
    });
  }
}
