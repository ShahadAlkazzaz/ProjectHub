using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectHubAPI.Migrations
{
    /// <inheritdoc />
    public partial class MakeProjectNumberUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectNumber",
                table: "Projects",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectNumber",
                table: "Projects",
                column: "ProjectNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Projects_ProjectNumber",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ProjectNumber",
                table: "Projects");
        }
    }
}
