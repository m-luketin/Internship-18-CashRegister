using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Domain.Helpers;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Jose;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.IO;

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

        [HttpGet("id/{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var gottenEmployee = _employeeRepository.GetEmployeeById(id);

            if(gottenEmployee != null)
                return Ok(gottenEmployee);

            return NotFound();
        }

        [HttpGet("username/{username}")]
        public IActionResult GetEmployeeByUsername(string username)
        {
            var gottenEmployee = _employeeRepository.GetEmployeeByUsername(username);

            if(gottenEmployee != null)
                return Ok(gottenEmployee);

            return NotFound();
        }

        [HttpPost("authenticate")]
        public IActionResult ValidateEmployee([FromBody]JObject data)
        {
            string username = data["username"].ToString();
            string password = data["password"].ToString();

            var employeeToValidate = _employeeRepository.GetEmployeeByUsername(username);

            if(employeeToValidate == null)
                return NotFound();

            if(string.Equals(employeeToValidate.Password, password))
            {
                IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true);
                IConfiguration configuration = configurationBuilder.Build();
                var jwtHelper = new JwtHelper(configuration);
                

                string token = jwtHelper.GetJwtToken(employeeToValidate);

                return Ok(token);
            }

            return Forbid();
        }
    }
}