import Model from './Model';

interface IUserOptions {
  uid?: string;
  createdAt?: string;
}

export default class Dashboard extends Model {
  public createdAt: string;
  public uid: string;
  public width: number;
  public height: number;

  constructor({ uid, createdAt }: IUserOptions) {
    super();
    if (uid) {
      this.uid = uid;
    }

    this.createdAt = createdAt || new Date().toString();
    this.width = 4;
    this.height = 3;
  }
}
