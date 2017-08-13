import Model from 'models/Model';

interface IUserOptions {
  id?: string;
  createdAt?: string;
}

export default class Dashboard extends Model {
  public createdAt: string;
  public id: string;
  public width: number;
  public height: number;

  constructor({ id, createdAt }: IUserOptions) {
    super({id});
    this.createdAt = createdAt || new Date().toString();
    this.width = 4;
    this.height = 3;
  }
}
