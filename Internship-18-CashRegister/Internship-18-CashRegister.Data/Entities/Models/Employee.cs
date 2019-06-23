using System;
using System.Collections.Generic;
using System.Text;

namespace Internship_18_CashRegister.Data.Entities.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int MyProperty { get; set; }
        public ICollection<Receipt> Receipts { get; set; }
    }
}
