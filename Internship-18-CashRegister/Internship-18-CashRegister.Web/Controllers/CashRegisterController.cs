using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Internship_18_CashRegister.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CashRegisterController : ControllerBase
    {
        public CashRegisterController(ICashRegisterRepository cashRegisterRepository)
        {
            _cashRegisterRepository = cashRegisterRepository;
        }
        private readonly ICashRegisterRepository _cashRegisterRepository;

        [Authorize(Roles = "Employee")]
        [HttpGet("all")]
        public IActionResult GetAllCashRegisters()
        {
            return Ok(_cashRegisterRepository);
        }
        [HttpPost("authenticate")]
        public IActionResult ValidateCashRegister([FromBody]JObject data)
        {
            var id = int.Parse(data["id"].ToString());

            if(_cashRegisterRepository.DoesExist(id))
                return Ok();

            return NotFound();
        }
    }
}