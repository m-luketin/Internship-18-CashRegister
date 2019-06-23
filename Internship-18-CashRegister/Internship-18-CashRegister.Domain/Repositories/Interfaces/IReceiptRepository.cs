using Internship_18_CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAllReceipts();
        bool AddReceipt(Receipt receiptToAdd);
        bool EditReceipt(Receipt editedReceipt);
        bool DeleteReceipt(int idOfReceiptToDelete);
        Receipt GetReceiptById(int id);
    }
}
