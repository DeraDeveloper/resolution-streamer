import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';
import { InstagramAuthRequest } from '../models/instagram-auth-request';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  authParam: InstagramAuthRequest = new InstagramAuthRequest();

  ngOnInit() {
    this.setAuthRequestParams();
  }

  requestAuthorization(){
    window.location.href = this.getAuthorizationUrl();
  }

  getAuthorizationUrl(): string{
    let url = Constants.AUTH_URL;
    let separator: string = "&";
    let delim: string = "?";
    url = url.concat(delim).concat("client_id=").concat(this.authParam.clientId)
    .concat(separator).concat("redirect_uri=").concat(this.authParam.callBackUrl)
    .concat(separator).concat("response_type=").concat(this.authParam.responseType);
    return url;
  }

  setAuthRequestParams() {
    this.authParam.callBackUrl = Constants.CALLBACK_URL;
    this.authParam.clientId = Constants.CLIENT_ID;
    this.authParam.responseType = Constants.CODE;
  }

}
