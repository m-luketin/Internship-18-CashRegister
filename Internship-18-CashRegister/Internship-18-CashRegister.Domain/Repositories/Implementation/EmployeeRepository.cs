using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Internship_18_CashRegister.Domain.Helpers;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly CashRegisterContext _context;
        public EmployeeRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Employee> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.Find(id);
        }

        public Employee GetEmployeeByUsername(string username)
        {
            return _context.Employees.FirstOrDefault(e => e.Name == username);
        }
    }
}
