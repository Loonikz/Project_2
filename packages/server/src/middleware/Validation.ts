export class Validation {
  private status: boolean;

  constructor({ fname, lname, age, city, phoneNumber, email, companyName }) {
    this.status =
      Validation.validateName(fname) &&
      Validation.validateName(lname) &&
      Validation.validateAge(age) &&
      Validation.validateCity(city) &&
      Validation.validatePhoneNumber(phoneNumber) &&
      Validation.validateEmail(email) &&
      Validation.validateCompanyName(companyName);
  }

  public isValid(): boolean {
    return this.status;
  }

  static validateName(value): boolean {
    return value.length >= 3 && value.length <= 20;
  }

  static validateAge(value): boolean {
    return (
      value === '' ||
      (Number.isInteger(Number(value)) && Number(value) >= 18 && Number(value) <= 120)
    );
  }

  static validateCity(value): boolean {
    return (
      (value.length >= 3 && value.length <= 20 && value.match(/^[a-zA-Zа-яА-я]*$/)) || value === ''
    );
  }

  static validatePhoneNumber(value): boolean {
    const regPhone =
      /((380|\+380|0)?)[ .-]?[(]?(39|50|63|66|67|68|91|92|93|94|95|96|97|98|99|31|32|33|34|35|36|37|38|41|42|43|44|46|47|48|49|51|52|53|54|55|56|57|58|59|61|62|64|65|69)[)]?[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}/;
    return value.match(regPhone) || value === '';
  }

  static validateEmail(value): boolean {
    const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    return value.match(regEmail) || value === '';
  }

  static validateCompanyName(value): boolean {
    return (value.length >= 3 && value.length <= 20) || value === '';
  }
}
