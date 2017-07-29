import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import {isClient} from 'app/config';

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

  constructor(config: IFirebaseConfig) {
    this.config = config;

    if (isClient) {
      this.initializeApplication();

      if (config.databaseURL) {
        this.initializeDatabase();
      }

      if (config.authDomain) {
        this.initializeAuth();
      }
    }
  }

  private initializeApplication() {
    this.app = firebase.initializeApp(this.config);
  }

  private initializeDatabase() {
    this.database = this.app.database();
  }

  private initializeAuth() {
    this.auth = this.app.auth();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }
}
