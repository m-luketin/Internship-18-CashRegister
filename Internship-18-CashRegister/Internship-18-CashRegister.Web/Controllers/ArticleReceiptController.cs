using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Internship_18_CashRegister.Web.Controllers
{
    [Route("api/articlereceipt")]
    [ApiController]
    public class ArticleReceiptController : ControllerBase
    {
        public ArticleReceiptController(IArticleReceiptRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }
        private readonly IArticleReceiptRepository _articleRepository;

        [HttpPost("add")]
        public IActionResult AddArticleReceipt([FromBody]JObject data)
        {
            var receiptId = Int32.Parse(data["receiptId"].ToString());
            var articleId = Int32.Parse(data["articleId"].ToString());
            var quantity = Int32.Parse(data["quantity"].ToString());

            var wasAddSuccessful= _articleRepository.AddArticleReceipt(receiptId, articleId, quantity);
            if(wasAddSuccessful)
                return Ok();

            return Forbid();
        }
    }
}