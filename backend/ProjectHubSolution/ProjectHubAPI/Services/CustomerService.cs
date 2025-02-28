using ProjectHubAPI.Models;
using ProjectHubAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectHubAPI.Services
{
    public class CustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<IEnumerable<Customer>> GetAllCustomers()
        {
            return await _customerRepository.GetAllCustomers();
        }

        public async Task<Customer?> GetCustomerById(int id)
        {
            return await _customerRepository.GetCustomerById(id);
        }

        public async Task AddCustomer(Customer customer)
        {
            await _customerRepository.AddCustomer(customer);
        }
    }
}
