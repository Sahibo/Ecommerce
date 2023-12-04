using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;
using Color = ASP_Project.Areas.Identity.Data.Models.Color;

namespace ASP_Project.Areas.Identity.Data.Validators
{
    public class ProductVariationValidator : AbstractValidator<ProductVariation>
    {
        private static readonly string UniqueMsg;
        private static readonly string SelectMsg;
        // private static readonly string PriceMsg;
        // private static readonly string SizeMsg;
        private static readonly string ColorMsg;
        // private static readonly string QuantityMsg;
        // private static readonly string DiscountMsg;


        private readonly UserContext _dbContext;

        public ProductVariationValidator(UserContext userContext)
        {
            _dbContext = userContext;

            RuleFor(p => p.Name).Must((productVariation, name) => CheckUnique(name, productVariation.ProductId)).WithMessage(UniqueMsg);
            RuleFor(p => p.ProductId).Must(CheckId).WithMessage(SelectMsg);
            // RuleFor(p => p.Price).Must(CheckPrice).WithMessage(PriceMsg);
            // RuleFor(p => p.Size).Must(CheckSize).WithMessage(SizeMsg);
            RuleFor(p => p.Color).Must(CheckColor).WithMessage(ColorMsg);
            // RuleFor(p => p.Quantity).Must(CheckQuantity).WithMessage(QuantityMsg);
            // RuleFor(p => p.Discount).Must(CheckDiscount).WithMessage(DiscountMsg);
        }

        static ProductVariationValidator()
        {
            UniqueMsg = "This variation is already exists.Please change color or size!";
            SelectMsg = "Product id must be selected!";
            // PriceMsg = "Price must be a valid number and more than zero!";
            // SizeMsg = "Size is required.";
            ColorMsg = "Color is required.";
            // QuantityMsg = "Quantity must be a positive number.";
            // DiscountMsg = "Discount must be a valid number.";
        }

        private bool CheckPrice(decimal price)
        {
            return price > 0 && Regex.IsMatch(price.ToString("0.##"), @"^\d+(\.\d{1,2})?$");
        }

        private bool CheckId(int id)
        {
            return _dbContext.Products.Any(p => p.Id == id);
        }
        // private bool CheckSize(string size)
        // {
        //     return !string.IsNullOrWhiteSpace(size);
        // }
        private bool CheckColor(Color color)
        {
            return color != Color.None;
        }
        // private bool CheckQuantity(ushort quantity)
        // {
        //     return quantity <= 32767;
        // }
        // private bool CheckDiscount(ushort discount)
        // {
        //     return discount < 100;
        // }

        private bool CheckUnique(string name, int productId)
        {
            return !_dbContext.ProductVariations.Any(c => c.Name == name && c.ProductId == productId);
        }
    }
}