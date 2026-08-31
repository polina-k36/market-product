import { isEmail, isPhoneNumber, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'isEmailOrPhone' })
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface
{
  validate(value: unknown) {
    if (typeof value !== 'string') {
        return false;
    }

    return isEmail(value) || isPhoneNumber(value, 'RU');
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid email or phone number`;
  }  
}

export function IsEmailOrPhone( validationOptions?: ValidationOptions ) {
  return function ( object: object, propertyName: string ) {
    registerDecorator({
      name: 'isEmailOrPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEmailOrPhoneConstraint,
    });
  };
}