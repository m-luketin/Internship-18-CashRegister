using Internship_18_CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        List<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        Employee GetEmployeeByUsername(string username);
    }
}
