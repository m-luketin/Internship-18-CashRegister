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
    public class ArticleController : ControllerBase
    {
        public ArticleController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }
        private readonly IArticleRepository _articleRepository;

        [HttpGet("all")]
        public IActionResult GetAllArticles()
        {
            return Ok(_articleRepository.GetAllArticles());
        }

        [HttpPost("add")]
        public IActionResult AddArticle(Article articleToAdd)
        {
            var wasAddSuccessful = _articleRepository.AddArticle(articleToAdd);

            if(wasAddSuccessful)
                return Ok();

            return Forbid();
        }

        [HttpPost("edit")]
        public IActionResult EditArticle(Article articleToEdit)
        {
            var wasEditSuccessful = _articleRepository.EditArticle(articleToEdit);

            if(wasEditSuccessful)
                return Ok();

            return NotFound();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetArticle(int id)
        {
            var gottenArticle = _articleRepository.GetArticleById(id);

            if(gottenArticle != null)
                return Ok(gottenArticle);

            return NotFound();
        }
        [HttpPost("get-by-name")]
        public IActionResult GetArticle([FromBody]JObject data)
        {
            var name = data["name"].ToString();
            var gottenArticle = _articleRepository.GetArticleByName(name);

            if(gottenArticle != null)
                return Ok(gottenArticle);

            return NotFound();
        }
        [HttpPost("search")]
        public IActionResult SearchArticles([FromBody]JObject data)
        {
            var toSearch = data["search"].ToString();

            var gottenArticles = _articleRepository.SearchArticles(toSearch);

            return Ok(JsonConvert.SerializeObject(gottenArticles));
        }
    }
}