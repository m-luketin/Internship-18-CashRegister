using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class ArticleReceiptRepository : IArticleReceiptRepository
    {
        private readonly CashRegisterContext _context;
        public ArticleReceiptRepository(CashRegisterContext context)
        {
            _context = context;
        }
        public List<ArticleReceipt> GetAllArticleReceipts()
        {
            return _context.ArticleReceipts.ToList();
        }

        public List<Tuple<int, int>> GetArticlesWithQuantityByReceiptId(int id)
        {
            var articleReceipts=  _context.ArticleReceipts.Where(ar => ar.ReceiptId == id).ToList();
            var articlesWithQuantity = new List<Tuple<int, int>>();

            foreach(var articleReceipt in articleReceipts)
                articlesWithQuantity.Add(new Tuple<int, int> ( articleReceipt.ArticleId, articleReceipt.Quantity ));

            return articlesWithQuantity;
        }
        public bool AddArticleReceipt(int receiptId, int articleId, int quantity)
        {
            var receipt = _context.Receipts.Find(receiptId);
            if(receipt == null)
                return false;

            var article = _context.Articles.Find(articleId);
            if(article == null)
                return false;

            if(article.UnitsInStock < quantity)
                return false;
            
            article.UnitsInStock -= quantity;

            _context.ArticleReceipts.Add(new ArticleReceipt
            {
                ReceiptId = receiptId,
                ArticleId = articleId,
                Quantity = quantity
            });
            _context.SaveChanges();
            
            return true;
        }
        
        
    }
}
