import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

declare var gapi:any;
const platformUrl = 'https://apis.google.com/js/platform.js?onload=__onGooglePlatformLoaded'
const clientUrl = 'https://apis.google.com/js/client.js?onload=__onGoogleClientLoaded'

@Injectable()
export class AuthenticationService {
  loadAPI: Promise<any>
  initAPI: Promise<any>
  static clientId = '727073919112-slfdr5vkibpv0gil9qin44vfg3q7hn30.apps.googleusercontent.com';
  static platformScopes = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly'
  ];
  private googleUser;
  private auth2;

  private userChangedSource = new Subject<Room>();
  userChanged$ = this.userChangedSource.asObservable();

  constructor(private zone:NgZone){

    let self = this

    let loadClientAPI = new Promise((resolve) => {
      window['__onGoogleClientLoaded'] = (ev) => {
        resolve(window['gapi'])
      }
      this.loadScript(clientUrl)
    })

    let loadPlatformAPI = new Promise((resolve) => {
      window['__onGooglePlatformLoaded'] = (ev) => {
        resolve(window['gapi'])
      }
      this.loadScript(platformUrl)
    })

    this.loadAPI = new Promise((resolve) => {
      loadPlatformAPI.then(() => {
        loadClientAPI.then(() => {
          resolve(window['gapi'])
        })
      })
    });

    this.initAPI = new Promise((resolve) => {
      this.loadAPI
        .then(() => gapi.load('auth2'))
        .then(() => gapi.client.load('calendar', 'v3'))
        .then(() => gapi.client.load('admin', 'directory_v1'))
        .then(() => {
          this.initAuth(true)
          resolve()
        })
    })

  }

  loadScript(url){
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  initAuth(immediate: boolean) {
    let authRequestData =
    {
      client_id: AuthenticationService.clientId,
      scope: AuthenticationService.platformScopes.join(' '),
      fetch_basic_profile: true
    }
    this.auth2 = gapi.auth2.init(authRequestData)

    this.auth2.isSignedIn.listen((val) => this.signinChanged(val));
    this.auth2.currentUser.listen((user) => this.userChanged(user));
    if (this.auth2.isSignedIn.get() == true) {
      this.auth2.signIn();
    }

    this.refreshValues();
  }

  private signinChanged(val) {
    //val is boolean
  }

  private userChanged(user) {
    this.googleUser = user;
    this.updateGoogleUser();
    this.userChangedSource.next(this.googleUser)
  }

  updateGoogleUser() {
    if (this.googleUser) {
      //TODO: update login state

      let basicProfile = this.googleUser.getBasicProfile();
      if (basicProfile) {
        // console.log('basic Profile id', basicProfile.getId())
        // console.log('basic Profile image', basicProfile.getImageUrl())
      }
    } else {
      //TODO: clear out login component?
    }
  }

  refreshValues() {
    if (this.auth2){
      this.googleUser = this.auth2.currentUser.get();
      this.updateGoogleUser();
    }
  }

  login() {
    this.auth2.signIn();
  }

  logout(){
    this.auth2.signOut();
  }
}
