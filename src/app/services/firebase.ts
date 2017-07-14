import firebase from 'firebase/app';
import 'firebase/database';

export interface FirebaseConfig {
  apiKey: string;
  projectId: string,
  authDomain?: string,
  databaseURL?: string,
  storageBucket?: string,
  messagingSenderId?: string
}

export default class Firebase {
  private config: FirebaseConfig;
  private app: firebase.app.App;
  private database: firebase.database.Database;

  constructor(config: FirebaseConfig) {
    this.config = config;

    this.initializeApplication();

    if (config.databaseURL) {
      this.initializeDatabase();
    }
  }

  private initializeApplication() {
    if (firebase.apps.length) {
      throw new Error('Cannot initialize Firebase Service multiple times!');
    }

    this.app = firebase.initializeApp(this.config);
  }

  private initializeDatabase() {
    this.database = firebase.database();
  }
}