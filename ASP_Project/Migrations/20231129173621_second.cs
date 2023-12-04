using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASP_Project.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_SubProductVariation_SubProductVariationId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductImages_SubProductVariation_SubProductVariationId",
                table: "ProductImages");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_SubProductVariation_SubProductVariationId",
                table: "ShoppingCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProductVariation_ProductVariations_ProductVariationId",
                table: "SubProductVariation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubProductVariation",
                table: "SubProductVariation");

            migrationBuilder.RenameTable(
                name: "SubProductVariation",
                newName: "SubProductVariations");

            migrationBuilder.RenameIndex(
                name: "IX_SubProductVariation_ProductVariationId",
                table: "SubProductVariations",
                newName: "IX_SubProductVariations_ProductVariationId");

            migrationBuilder.AlterColumn<int>(
                name: "Gender",
                table: "ParentCategories",
                type: "int",
                nullable: false,
                defaultValue: 3,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 2);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubProductVariations",
                table: "SubProductVariations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_SubProductVariations_SubProductVariationId",
                table: "Favorites",
                column: "SubProductVariationId",
                principalTable: "SubProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImages_SubProductVariations_SubProductVariationId",
                table: "ProductImages",
                column: "SubProductVariationId",
                principalTable: "SubProductVariations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_SubProductVariations_SubProductVariationId",
                table: "ShoppingCartItems",
                column: "SubProductVariationId",
                principalTable: "SubProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProductVariations_ProductVariations_ProductVariationId",
                table: "SubProductVariations",
                column: "ProductVariationId",
                principalTable: "ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_SubProductVariations_SubProductVariationId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductImages_SubProductVariations_SubProductVariationId",
                table: "ProductImages");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_SubProductVariations_SubProductVariationId",
                table: "ShoppingCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProductVariations_ProductVariations_ProductVariationId",
                table: "SubProductVariations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubProductVariations",
                table: "SubProductVariations");

            migrationBuilder.RenameTable(
                name: "SubProductVariations",
                newName: "SubProductVariation");

            migrationBuilder.RenameIndex(
                name: "IX_SubProductVariations_ProductVariationId",
                table: "SubProductVariation",
                newName: "IX_SubProductVariation_ProductVariationId");

            migrationBuilder.AlterColumn<int>(
                name: "Gender",
                table: "ParentCategories",
                type: "int",
                nullable: false,
                defaultValue: 2,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 3);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubProductVariation",
                table: "SubProductVariation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_SubProductVariation_SubProductVariationId",
                table: "Favorites",
                column: "SubProductVariationId",
                principalTable: "SubProductVariation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImages_SubProductVariation_SubProductVariationId",
                table: "ProductImages",
                column: "SubProductVariationId",
                principalTable: "SubProductVariation",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_SubProductVariation_SubProductVariationId",
                table: "ShoppingCartItems",
                column: "SubProductVariationId",
                principalTable: "SubProductVariation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProductVariation_ProductVariations_ProductVariationId",
                table: "SubProductVariation",
                column: "ProductVariationId",
                principalTable: "ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
