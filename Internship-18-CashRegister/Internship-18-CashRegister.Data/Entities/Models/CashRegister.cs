using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Data.Entities.Models
{
    public class CashRegister
    {
        public int CashRegisterId { get; set; }
        public ICollection<Receipt> Receipts { get; set; }
    }
}
