import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const SERVER_URL = 'https://salty-reaches-52729.herokuapp.com/subscription'

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription,{headers: {'Access-Control-Allow-Origin': '*' }})
  }
}