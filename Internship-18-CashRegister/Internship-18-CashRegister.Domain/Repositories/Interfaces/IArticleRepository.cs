using Internship_18_CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Interfaces
{
    public interface IArticleRepository
    {
        List<Article> GetAllArticles();
        bool AddArticle(Article articleToAdd);
        bool EditArticle(Article editedArticle);
        Article GetArticleById(int id);
        Article GetArticleByName(string name);
        List<Article> SearchArticles(string name);
        bool UpdateQuantity(string name, int quantityAdded);

    }
}
