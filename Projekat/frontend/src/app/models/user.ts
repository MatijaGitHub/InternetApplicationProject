export class Address{
    country: string;
    city: string;
    zipCode: string;
    streetAdr: string;
}
export class User{
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    name_of_organization: string;
    adress_of_organization: Address;
    organization_identification_number: string;
    type_of_user: number;
    image_path: string;
}