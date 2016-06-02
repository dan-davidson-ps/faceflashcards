import { Injectable, NgZone } from '@angular/core';

declare var gapi:any;

@Injectable()
export class AuthenticationService {
  // constants
  static clientId = '727073919112-slfdr5vkibpv0gil9qin44vfg3q7hn30.apps.googleusercontent.com';
  static scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly'
  ];
  static logoutUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
  /*
   * global application state, so it's OK to keep it as field value of a singleton. alternative would be a
   * buitl-in global value store.
   */
  public isAuthenticated: boolean = false;
  public userName: string;
  public userImageUrl: string;

  constructor(private zone:NgZone){
    let w:any = window
    console.log('constructor, zone: ', zone)
    w.authService = {
      component: this,
      initAuth: () => this.internalAuthenticate(true),
      zone: zone};
  }

  login() {
    console.log('proceed login');
    // check the authentication and present a dialog on failure
    this.internalAuthenticate(false);
  }

  logout(){
    console.log('proceed logout');
    // reset the gloab application state
    this.isAuthenticated = false;
    this.setUserData('','');
    /* revoke existing token - there is no Google API support for that, window.fetch() is
     * a replacement for the JS XHTTP Request, is not available in older browsers though.
     */
    window.fetch(AuthenticationService.logoutUrl + gapi.auth.getToken().access_token);
  }

  private internalAuthenticate(immediate: boolean){
    /* heavily use promises here for 2 reasons:
     *
     * nr1: readability (image callback syntax here :( )
     * nr2: ui synchronisation: due to the GAPI, the result is handled in a callback,
     *		angular does therefor not know of any scope changes. since ther is no scope
     *		as in angular1 one cannot manually trigger the scope digest.
     *		Using Promises solves this problem since the scope digest is triggered on
     *		resove() and reject().
     * The callbacks passed to then() are lambdas to ensure the call applies to the correct
     * scope.
     */
    return gapi.client.load('oauth2', 'v2', () => {
        this.proceedAuthentication(immediate)
          .then(() => {console.log('gcapi'); this.initializeGoogleCalendarAPI(); console.log('gcapi done')})
          .then(() => {console.log('adminapi'); this.initializeAdminAPI(); console.log('adminapi done')})
          .then((response:any) => {
            console.log('setUserData', response);
            if (response) {
              this.setUserData(response.result.displayName, response.result.image.url);
            }
            console.log('setUserData done')})
          .catch((error:any) => {console.error('authentication failed: ', error)});
      })
  }

  private proceedAuthentication(immediate:boolean){
    return new Promise((resolve, reject) => {
      console.log('proceed authentication - immediate: ' + immediate);
      // gapi.client.setApiKey(AuthenticationService.apiKey);

      var authorisationRequestData =
      {
        'client_id': AuthenticationService.clientId,
        'scope': AuthenticationService.scopes,
        'immediate': immediate
      }
      console.log('authData', authorisationRequestData)
      console.log('gapi', gapi)
      console.log('gapi.auth', gapi.auth)
      var self = this
      gapi.auth.authorize(authorisationRequestData,
        function(authenticationResult) {
          console.log('!!!!')
          var args = Array.from(arguments);
          console.log('authorize args', args)
          if(authenticationResult && !authenticationResult.error){
            self.isAuthenticated = true
            self.setUserData('unknown', '');
            resolve()
          }
          else {
            console.log('auth failed?')
            self.isAuthenticated = false
            self.setUserData('','');
            reject();
          }
        }
      );
    });
  }

  private initializeGooglePlusAPI(){
    return new Promise((resolve, reject) => {
      console.log('initialize Google Plus API');
      resolve(gapi.client.load('plus', 'v1'));
    });
  }

  private initializeGoogleCalendarAPI(){
    return new Promise((resolve, reject) => {
      console.log('initialize Google Calendar API');
      resolve(gapi.client.load('calendar', 'v3'));
    });
  }

  private initializeAdminAPI(){
    return new Promise((resolve, reject) => {
      console.log('initialize Admin API');
      resolve(gapi.client.load('admin', 'directory_v1'));
    });
  }

  private loadGooglePlusUserData() {
    return new Promise((resolve, reject) => {
      console.log('load Google Plus data');
      resolve(gapi.client.plus.people.get({'userId': 'me'}));
    });
  }

  private setUserData(userName: string, userImageUrl: string){
    this.userName = userName;
    this.userImageUrl = userImageUrl;
    console.log('user: ' + this.userName + ', image: ' + this.userImageUrl);
  }
}
