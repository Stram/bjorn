import Model from './Model';

interface IUserOptions {
  uid?: string;
  createdAt?: string;
}

export default class Dashboard extends Model {
  public createdAt: string;
  public uid: string;

  constructor({ uid, createdAt }: IUserOptions) {
    super();
    if (uid) {
      this.uid = uid;
    }

    this.createdAt = createdAt || new Date().toString();
  }
}
