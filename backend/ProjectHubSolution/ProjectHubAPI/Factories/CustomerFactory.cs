using ProjectHubAPI.Models;

namespace ProjectHubAPI.Factories
{
    public static class CustomerFactory
    {
        public static Customer CreateCustomer(string name, int customerNumber)
        {
            return new Customer
            {
                Name = name,
                CustomerNumber = customerNumber
            };
        }
    }
}
