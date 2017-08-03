import Model from './Model';

interface IUserOptions {
  uid: string;
  name: string;
}

export default class Dashboard extends Model {
  public uid: string;
  public name: string;

  constructor({ uid, name }: IUserOptions) {
    super();
    this.uid = uid;
    this.name = name;
  }
}
