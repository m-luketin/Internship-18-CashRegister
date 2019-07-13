using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
            return _context.Receipts.Include( r => r.Register ).Include( r => r.Employee ).ToList();
        }

        public int AddReceipt(Guid serialNumber, DateTime timeStamp, int employeeId, int cashRegisterId)
        {
            var employee = _context.Employees.Find(employeeId);
            if(employee == null)
                return 0;

            var cashRegister = _context.CashRegisters.Find(cashRegisterId);
            if(cashRegister == null)
                return 0;

            _context.Receipts.Add(new Receipt {
                SerialNumber = serialNumber,
                TimeStamp = timeStamp,
                Employee = employee,
                Register = cashRegister
            });
            _context.SaveChanges();

            var newReceiptId = _context.Receipts.FirstOrDefault(r => Equals(serialNumber, r.SerialNumber)).ReceiptId;
            if(newReceiptId ==0)
                return 0;

            return newReceiptId;
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
