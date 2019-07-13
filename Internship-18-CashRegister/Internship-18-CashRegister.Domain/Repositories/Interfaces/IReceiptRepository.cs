using Internship_18_CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAllReceipts();
        int AddReceipt(Guid serialNumber, DateTime timeStamp, int employeeId, int cashRegisterId);
        Receipt GetReceiptById(int id);
    }
}
