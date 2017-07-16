import Field, {IFieldOptions} from './Field';

export interface IFormOptions {
  fields: Array<IFieldOptions>;
}

export default abstract class Form {
  private fields: Array<Field>;

  constructor({fields}: IFormOptions) {
    this.fields = fields.map((fieldOptions) => new Field(fieldOptions));
  }

  get isValid() {
    return this.fields.every((field) => field.isValid);
  }

  public submit() {
    if (this.isValid) {
      this.onSubmit();
    }
  }

  protected abstract onSubmit(): Promise<any>;
}
