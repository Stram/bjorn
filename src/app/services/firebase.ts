import firebase from 'firebase/app';
import 'firebase/database';

export interface FirebaseConfig {
  apiKey: string;
}

export default class Firebase {
  private config: FirebaseConfig;
  private app: firebase.app.App;
  private database: firebase.database.Database;

  constructor(config: FirebaseConfig) {
    this.config = config;

    this.initializeApplication();
    this.initializeDatabase();
  }

  private initializeApplication() {
    this.app = firebase.initializeApp(this.config);
  }

  private initializeDatabase() {
    this.database = firebase.database();
  }
}