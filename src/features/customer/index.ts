import { groupBy } from 'lodash';

import { Customer } from '../../types/customer';
import { query } from '../query';

export const getCustomerZipCode = (customer: Customer) => {
  return 'zip-code';
};

export const getCustomerHouseNumber = (customer: Customer) => {
  return 'house-number';
};

export const getCustomersByANI = async (sessionId: string, ani: string): Promise<Customer[]> => {
  const customers = await query<Customer[]>({
    queryKey: 'customers',
    queryParams: { ani },
    queryFn: () => {
      // fetch customers from ESB using given ANI
      return Promise.resolve([]);
    },
  });

  const customersByUniqCriteria = groupBy(customers, (customer) => {
    const zipCode = getCustomerZipCode(customer);
    const houseNumber = getCustomerHouseNumber(customer);

    return [zipCode, houseNumber].join('___');
  });

  return Object.values(customersByUniqCriteria).reduce((result, group) => {
    return [...result, ...group];
  }, []);
};

export const getCustomersWithUniqZipCode = (customers: Customer[]) => {
  const customersByZipCode = groupBy(customers, getCustomerZipCode);

  return Object.values(customersByZipCode).reduce((result, group) => {
    if (group.length === 1) {
      return [...result, ...group];
    }

    return result;
  }, []);
};

export const getCustomersWithUniqHouseNumber = (customers: Customer[]) => {
  const customersByHouseNumber = groupBy(customers, getCustomerHouseNumber);

  return Object.values(customersByHouseNumber).reduce((result, group) => {
    if (group.length === 1) {
      return [...result, ...group];
    }

    return result;
  }, []);
};
