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
        bool DeleteArticle(int idOfArticleToDelete);
        Article GetArticleById(int id);
    }
}
