using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class CashRegisterRepository : ICashRegisterRepository
    {
        private readonly CashRegisterContext _context;
        public CashRegisterRepository(CashRegisterContext context)
        {
            _context = context;
        }
        
        public List<CashRegister> GetAllCashRegisters()
        {
            return _context.CashRegisters.ToList();
        }
        
        public bool DoesExist(int id)
        {
            return _context.CashRegisters.Find(id) != null;
        }
    }
}
