using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HogwartsHouses.Migrations
{
    /// <inheritdoc />
    public partial class SeedRooms_v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "maxCapacity",
                table: "Rooms",
                newName: "MaxCapacity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaxCapacity",
                table: "Rooms",
                newName: "maxCapacity");
        }
    }
}
