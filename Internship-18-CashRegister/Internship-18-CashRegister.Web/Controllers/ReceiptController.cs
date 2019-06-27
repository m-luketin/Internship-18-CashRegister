using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship_18_CashRegister.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        public ReceiptController(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }
        private readonly IReceiptRepository _receiptRepository;

        [HttpGet("all")]
        public IActionResult GetAllReceipts()
        {
            return Ok(_receiptRepository);
        }

        [HttpPost("add")]
        public IActionResult AddReceipt(Receipt receiptToAdd)
        {
            var wasAddSuccessful = _receiptRepository.AddReceipt(receiptToAdd);

            if(wasAddSuccessful)
                return Ok();

            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetReceiptById(int id)
        {
            var gottenReceipt = _receiptRepository.GetReceiptById(id);

            if(gottenReceipt != null)
                return Ok(gottenReceipt);

            return NotFound();
        }
    }
}