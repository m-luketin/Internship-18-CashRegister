using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship_18_CashRegister.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        private readonly IEmployeeRepository _employeeRepository;

        [HttpGet("all")]
        public IActionResult GetAllEmployees()
        {
            return Ok(_employeeRepository);
        }

        public IActionResult GetEmployeeById(int id)
        {
            var gottenEmployee = _employeeRepository.GetEmployeeById(id);

            if(gottenEmployee != null)
                return Ok(gottenEmployee);

            return NotFound();
        }
    }
}