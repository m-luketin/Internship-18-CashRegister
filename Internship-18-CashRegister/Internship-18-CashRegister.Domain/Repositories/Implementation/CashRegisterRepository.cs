using Internship_18_CashRegister.Data.Entities;
using Internship_18_CashRegister.Data.Entities.Models;
using Internship_18_CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Domain.Repositories.Implementation
{
    public class CashRegisterRepository : ICashRegisterRepository
    {
        private readonly CashRegisterContext _context;
        public bool AddCashRegister(CashRegister cashRegisterToAdd)
        {
            if(DoesExist(cashRegisterToAdd) || IsNameValid(cashRegisterToAdd))
                return false;

            _context.CashRegisters.Add(cashRegisterToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteCashRegister(int idOfCashRegisterToDelete)
        {
            throw new NotImplementedException();
        }

        public bool EditCashRegister(CashRegister editedCashRegister)
        {
            throw new NotImplementedException();
        }

        public List<CashRegister> GetAllCashRegisters()
        {
            throw new NotImplementedException();
        }

        public CashRegister GetCashRegisterById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
