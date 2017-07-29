import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

type loginHandler = (user: any) => void;
type logoutHandler = () => void;

export interface IFirebaseConfig {
  apiKey: string;
  projectId: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

export default class Firebase {
  public database: firebase.database.Database;
  public auth: firebase.auth.Auth;
  public googleAuthProvider: firebase.auth.GoogleAuthProvider;

  private config: IFirebaseConfig;
  private app: firebase.app.App;

  private onLoginHandlers: Array<loginHandler> = [];
  private onLogoutHandlers: Array<logoutHandler> = [];

  constructor(config: IFirebaseConfig) {
    this.config = config;

    this.initializeApplication();

    if (config.databaseURL) {
      this.initializeDatabase();
    }

    if (config.authDomain) {
      this.initializeAuth();
      this.setAuthListeners();
    }
  }

  public onLogin(onLoginHandler: loginHandler) {
    this.onLoginHandlers.push(onLoginHandler);
  }

  public onLogout(onLogoutHandler: logoutHandler) {
    this.onLogoutHandlers.push(onLogoutHandler);
  }

  private initializeApplication() {
    if (firebase.apps.length) {
      this.app = firebase.app();
    } else {
      this.app = firebase.initializeApp(this.config);
    }
  }

  private initializeDatabase() {
    this.database = this.app.database();
  }

  private initializeAuth() {
    this.auth = this.app.auth();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  private setAuthListeners() {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.onLoginHandlers.forEach((handler) => handler(user));
      } else {
        this.onLogoutHandlers.forEach((handler) => handler());
      }
    });
  }
}
