using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace ASP_Project.Areas.Identity.Data.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        private static readonly string NameMsg;
        private static readonly string UniqueNameMsg;
        private static readonly string SelectMsg;

        private readonly UserContext _dbContext;


        public CategoryValidator(UserContext userContext)
        {
            _dbContext = userContext;
            RuleFor(c => c.Name).Must(CheckName).WithMessage(NameMsg);
            RuleFor(c => c.Name).Must(CheckUniqueName).WithMessage(UniqueNameMsg);
            RuleFor(c => c.ParentCategoryId)
                .Must(CheckId) 
                .WithMessage(SelectMsg);
        }

        static CategoryValidator()
        {
            NameMsg = "Category name must be between 1 and 30 characters and contain only letters.";
            UniqueNameMsg = "Category name must be unique!";
            SelectMsg = "You must select category!";
        }


        private static bool CheckId(int id)
        {
            return id > 0;
        }

        public static bool CheckName(string? name)
        {
            Regex re = new(@"^[A-Za-z]");
            return name != null && re.IsMatch(name) && name.Length > 0 && name.Length <= 30;

        }

        private bool CheckUniqueName(string name)
        {
            return !_dbContext.Categories.Any(c => c.Name == name);
        }
        
        
    }
}
