using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HogwartsHouses.Migrations
{
    /// <inheritdoc />
    public partial class SeedStudents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "House", "MaxCapacity", "Name" },
                values: new object[,]
                {
                    { 6, (byte)2, 4, "Raven Tower Room 1" },
                    { 7, (byte)2, 2, "Raven Tower Room 2" },
                    { 8, (byte)1, 4, "Badger Den Room 1" },
                    { 9, (byte)1, 2, "Badger Den Room 2" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "House", "Name", "Pet", "RoomId" },
                values: new object[,]
                {
                    { 1, (byte)0, "Hermione", (byte)1, 1 },
                    { 2, (byte)3, "Draco", (byte)0, 4 },
                    { 3, (byte)0, "Ron Weasley", (byte)2, 1 },
                    { 4, (byte)0, "Neville Longbottom", (byte)2, 1 },
                    { 5, (byte)0, "Harry Potter", (byte)3, 1 },
                    { 8, (byte)3, "Pansy Parkinson", (byte)0, 5 },
                    { 6, (byte)2, "Luna Lovegood", (byte)1, 6 },
                    { 7, (byte)2, "Cho Chang", (byte)0, 6 },
                    { 9, (byte)1, "Cedric Diggory", (byte)0, 8 },
                    { 10, (byte)1, "Ernie Macmillan", (byte)0, 8 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
