using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace ASP_Project.Areas.Identity.Data.Validators
{
    public class ParentCategoryValidator : AbstractValidator<ParentCategory>
    {
        private static readonly string NameMsg;
        private static readonly string UniqueNameMsg;


		private readonly UserContext _dbContext;
        
        public ParentCategoryValidator(UserContext userContext)
        {
            _dbContext = userContext;
            
            RuleFor(c => c.Name).Must(CheckName).WithMessage(NameMsg);
            RuleFor(c => c.Name).Must(CheckUniqueName).WithMessage(UniqueNameMsg);

		}

		static ParentCategoryValidator()
        {
            NameMsg = "Parent category name must be 1 to 30 characters long and contain only letters!";
            UniqueNameMsg = "Parent category name must be unique!";
        }


        private bool CheckName(string? name)
        {
            Regex re = new(@"^[A-Za-z]");
            return name != null && re.IsMatch(name) && name.Length > 0 && name.Length <= 30;
        }

        private bool CheckUniqueName(string name)
        {
            return !_dbContext.ParentCategories.Any(c => c.Name == name);
        }

    }
}
