using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly CashRegisterContext _context;
        public ArticleRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Article> GetAllArticles()
        {
            return _context.Articles.ToList();
        }

        public bool AddArticle(Article articleToAdd)
        {
            if(DoesExist(articleToAdd) || IsNameValid(articleToAdd))
                return false;

            _context.Articles.Add(articleToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool EditArticle(Article editedArticle)
        {
            if(!DoesExist(editedArticle) || IsNameValid(editedArticle))
                return false;

            var articleToEdit = _context.Articles.Find(editedArticle.ArticleId);

            if(articleToEdit == null || articleToEdit.UnitsInStock != editedArticle.UnitsInStock)
                return false;

            articleToEdit.Price = editedArticle.Price;
            articleToEdit.Barcode = editedArticle.Barcode;
            articleToEdit.IsTaxRateReduced = editedArticle.IsTaxRateReduced;
            _context.SaveChanges();

            return true;
        }

        public Article GetArticleById(int id)
        {
            return _context.Articles.Find(id);
        }
        public Article GetArticleByName(string name)
        {
            return _context.Articles.FirstOrDefault( a => String.Equals(a.Name, name, StringComparison.CurrentCultureIgnoreCase));
        }
        public List<Article> SearchArticles(string name)
        {
            return _context.Articles.Where(a => a.Name.Contains(name)).ToList();
        }

        public bool UpdateQuantity(string name, int quantityAdded)
        {
            if(quantityAdded < 1)
                return false;

            var articleToUpdate = _context.Articles.FirstOrDefault(a => String.Equals(a.Name, name, StringComparison.CurrentCultureIgnoreCase));

            if(articleToUpdate == null)
                return false;

            articleToUpdate.UnitsInStock += quantityAdded;
            _context.SaveChanges();

            return true;
        }

        private bool DoesExist(Article article)
        {
            return _context.Articles.Any(a => string.Equals(a.Name, article.Name, StringComparison.CurrentCultureIgnoreCase));
        }

        private bool IsNameValid(Article article)
        {
            return article.Name.Length > 3;
        }
    }
}
