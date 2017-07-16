import Validator from './Validator';

class PresenceValidator implements Validator {
  public validate(fieldValue: any) {
    if (Array.isArray(fieldValue)) {
      return Boolean(fieldValue.length);
    }
    return Boolean(fieldValue);
  }
}

export default new PresenceValidator();
