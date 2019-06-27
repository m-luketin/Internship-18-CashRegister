using Microsoft.EntityFrameworkCore.Migrations;

namespace Internship_18_CashRegister.Data.Migrations
{
    public partial class TaxAndEmployeeNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "TaxRate",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Employees",
                newName: "Name");

            migrationBuilder.AddColumn<bool>(
                name: "IsTaxRateReduced",
                table: "Articles",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTaxRateReduced",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Employees",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Employees",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TaxRate",
                table: "Articles",
                nullable: false,
                defaultValue: 0);
        }
    }
}
