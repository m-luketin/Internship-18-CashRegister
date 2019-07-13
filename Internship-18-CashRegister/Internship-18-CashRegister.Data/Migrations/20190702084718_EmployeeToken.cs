using Microsoft.EntityFrameworkCore.Migrations;

namespace Internship_18_CashRegister.Data.Migrations
{
    public partial class EmployeeToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Employees");
        }
    }
}
