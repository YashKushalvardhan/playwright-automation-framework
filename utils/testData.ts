// utils/testData.ts
import { faker } from '@faker-js/faker';

// Static data - cart ke liye (real products jo site pe exist karte hain)
export const products = ['Blue Top', 'Men Tshirt', 'Sleeveless Dress'];

// Dynamic data - Faker se generate, negative login test ke liye
export function generateInvalidCredentials(count: number = 3) {
  return Array.from({ length: count }, () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  }));
}