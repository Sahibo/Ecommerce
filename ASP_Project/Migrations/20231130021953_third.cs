using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASP_Project.Migrations
{
    /// <inheritdoc />
    public partial class third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductImages_SubProductVariations_SubProductVariationId",
                table: "ProductImages");

            migrationBuilder.DropIndex(
                name: "IX_ProductImages_SubProductVariationId",
                table: "ProductImages");

            migrationBuilder.DropColumn(
                name: "SubProductVariationId",
                table: "ProductImages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubProductVariationId",
                table: "ProductImages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_SubProductVariationId",
                table: "ProductImages",
                column: "SubProductVariationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImages_SubProductVariations_SubProductVariationId",
                table: "ProductImages",
                column: "SubProductVariationId",
                principalTable: "SubProductVariations",
                principalColumn: "Id");
        }
    }
}
