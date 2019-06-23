using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class ReceiptRepository : IReceiptRepository
    {
        public bool AddReceipt(Receipt receiptToAdd)
        {
            throw new NotImplementedException();
        }

        public bool DeleteReceipt(int idOfReceiptToDelete)
        {
            throw new NotImplementedException();
        }

        public bool EditReceipt(Receipt editedReceipt)
        {
            throw new NotImplementedException();
        }

        public List<Receipt> GetAllReceipts()
        {
            throw new NotImplementedException();
        }

        public Receipt GetReceiptById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
