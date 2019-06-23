using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public bool AddEmployee(Employee employeeToAdd)
        {
            throw new NotImplementedException();
        }

        public bool DeleteEmployee(int idOfEmployeeToDelete)
        {
            throw new NotImplementedException();
        }

        public bool EditEmployee(Employee editedEmployee)
        {
            throw new NotImplementedException();
        }

        public List<Employee> GetAllEmployees()
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployeeById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
