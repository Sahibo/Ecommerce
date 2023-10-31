using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace ASP_Project.Areas.Identity.Data.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        private static readonly string NameMsg;
        private static readonly string MakeMsg;
        private static readonly string FabricMsg;
        private static readonly string DescriptionMsg;

        //private readonly UserContext _dbContext;

        public ProductValidator()
        {
            
            //_dbContext = userContext; UserContext userContext
            
            RuleFor(p => p.Name).NotEmpty().Must(CheckName).WithMessage(NameMsg);
            RuleFor(p => p.Make).NotEmpty().Must(CheckMake).WithMessage(MakeMsg);
            RuleFor(p => p.Fabric).NotEmpty().Must(CheckFabric).WithMessage(FabricMsg);
            RuleFor(p => p.Description).NotEmpty().Must(CheckDescription).WithMessage(DescriptionMsg);

        }
        static ProductValidator()
        {
            NameMsg = "Product\'s name must be less than 50 characters and contain only letters!";
            MakeMsg = "Product\'s make must be less than 25 characters and contain only letters!";
            FabricMsg = "Product\'s fabric must be less than 100 characters!";
            DescriptionMsg = "Product\'s description must be less than 100 characters!";
        }

        private static bool CheckName(string? name)
        {
            Regex re = new(@"^[A-Za-z]");
            return name != null && re.IsMatch(name) && name.Length is > 0 and <= 50;
        }

        private static bool CheckMake(string? make)
        {
            
            Regex re = new(@"^[A-Za-z]");
            return make != null && re.IsMatch(make) && make.Length is > 0 and <= 25;
        }

        private static bool CheckFabric(string? fabric)
        {
            Regex re = new(@"^[a-zA-Z0-9!.\-;:,@#%\s]+$");
            return  fabric != null && re.IsMatch(fabric) && fabric.Length is > 0 and <= 50;
        }

        private static bool CheckDescription(string? description)
        {
            Regex re = new(@"^[a-zA-Z0-9!.\-;:,@#%\s]+$");
            return description != null && re.IsMatch(description) && description.Length is > 0 and <= 100;
        }
    }
}
