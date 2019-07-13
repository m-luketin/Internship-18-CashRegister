using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
            var allReceipts = _receiptRepository.GetAllReceipts();

            foreach(var receipt in allReceipts)
            {
                receipt.Employee.Receipts = null;
                receipt.Register.Receipts = null;
            }

            return Ok(JsonConvert.SerializeObject(allReceipts));
        }

        [HttpPost("add")]
        public IActionResult AddReceipt([FromBody]JObject data)
        {
            var employee = data["employee"];
            var registerId = Int32.Parse(data["register"].ToString());

            var serialNumber = Guid.NewGuid();
            var timeStamp = DateTime.Now;
            var employeeId = Int32.Parse(employee["employeeId"].ToString());
            var cashRegisterId = registerId;

            var newReceiptInt = _receiptRepository.AddReceipt(serialNumber, timeStamp, employeeId, cashRegisterId);

            string result = "{\"receiptId\": \"" + newReceiptInt + "\", \"time\": \"" + timeStamp + "\", \"guid\": \"" + serialNumber + "\"}";

            if(newReceiptInt != 0)
                return Ok(result);

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