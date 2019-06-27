using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class ReceiptRepository : IReceiptRepository
    {
        private readonly CashRegisterContext _context;
        public ReceiptRepository(CashRegisterContext context)
        {
            _context = context;
        }
        public List<Receipt> GetAllReceipts()
        {
            return _context.Receipts.ToList();
        }

        public bool AddReceipt(Receipt receiptToAdd)
        {
            if(DoesExist(receiptToAdd))
                return false;

            _context.Receipts.Add(receiptToAdd);
            _context.SaveChanges();
            return true;
        }

        public Receipt GetReceiptById(int id)
        {
            return _context.Receipts.Find(id);
        }

        private bool DoesExist(Receipt receipt)
        {
            return _context.Receipts.Any(r => r.SerialNumber == receipt.SerialNumber);
        }
        
    }
}
