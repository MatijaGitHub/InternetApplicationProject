export class Address{
    country: String;
    city: String;
    zipCode: String;
    streetAdr: String;
}
export class User{
    username: String;
    password: String;
    firstname: String;
    lastname: String;
    phonenumber: String;
    email: String;
    name_of_organization: String;
    adress_of_organization: Address;
    organization_identification_number: String;
    type_of_user: Number;
}