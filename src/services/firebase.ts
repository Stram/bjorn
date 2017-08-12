import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
  private authStatePromise: Promise<any>;

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

  public checkSession() {
    return this.authStatePromise;
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
    this.authStatePromise = new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user: any) => {
        if (user) {
          resolve({user});
        } else {
          reject({user: null});
        }
      });
    });
  }
}
