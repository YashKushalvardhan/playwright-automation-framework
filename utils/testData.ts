// utils/testData.ts
import { faker } from '@faker-js/faker';

// Static data - for cart(rral products exists on cart)
export const products = ['Blue Top', 'Men Tshirt', 'Sleeveless Dress'];

// Dynamic data - For negative login via faker
export function generateInvalidCredentials(count: number = 3) {
  return Array.from({ length: count }, () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  }));
}

// user payload generator
export function generateNewUser() {
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 10 });

  return {
    name: faker.person.firstName(),
    email,
    password,
    title: 'Mr',
    birth_date: '15',
    birth_month: '6',
    birth_year: '1995',
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'India',
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
}