import { Component, ViewEncapsulation } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker'
import { PushNotificationService } from './app.pushNotification.service';

const VAPID_PUBLIC = 'BIpGXtXubCD-QAa2bz_e0z4uGGdanNPDkGc5ZlKDMe9BVcGF8Lij2SfcF0Bb0Ds5PWyimoygTQoxjJm_WigD58M';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'Home Monitor';

  user = "John Doe";


  constructor(swPush: SwPush, pushService: PushNotificationService,private swUpdate: SwUpdate) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe((data) => console.log('Got Message',data))
        })
        .catch(err => console.error('Error',err))
    }
  }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {

        this.swUpdate.available.subscribe(() => {

            if(confirm("New version available. Load New Version?")) {

                window.location.reload();
            }
        });
    }
  }    
}
