using Internship_18_CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Interfaces
{
    public interface IArticleReceiptRepository
    {
         List<ArticleReceipt> GetAllArticleReceipts();

         bool AddArticleReceipt(int receiptId, int articleId, int quantity);
        List<Tuple<int, int>> GetArticlesWithQuantityByReceiptId(int id);
    }
}
