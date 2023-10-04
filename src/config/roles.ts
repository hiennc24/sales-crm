const allRoles = {
  customer: [],
  user: [],
  admin: [
    'getUsers',
    'manageUsers',
    'getCustomerCategories',
    'manageCustomerCategories',
    'getRegions',
    'manageRegions',
    'getSpecialists',
    'manageSpecialists',
    'getServices',
    'manageServices',
    'getCustomers',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export default {
  roles,
  roleRights,
};
