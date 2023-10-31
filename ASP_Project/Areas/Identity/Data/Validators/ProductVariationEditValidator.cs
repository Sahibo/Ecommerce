using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;
using Color = ASP_Project.Areas.Identity.Data.Models.Color;

namespace ASP_Project.Areas.Identity.Data.Validators
{
    public class ProductVariationEditValidator : AbstractValidator<ProductVariation>
    {
        private static readonly string PriceMsg;
        private static readonly string QuantityMsg;
        private static readonly string DiscountMsg;
        
        private readonly UserContext _dbContext;

        public ProductVariationEditValidator(UserContext userContext)
        {
            _dbContext = userContext;
            
            RuleFor(p => p.Price).Must(CheckPrice).WithMessage(PriceMsg);
            RuleFor(p => p.Quantity).Must(CheckQuantity).WithMessage(QuantityMsg);
            RuleFor(p => p.Discount).Must(CheckDiscount).WithMessage(DiscountMsg);
        }

        static ProductVariationEditValidator()
        {
            PriceMsg = "Price must be a valid number and more than zero!";
            QuantityMsg = "Quantity must be a positive number.";
            DiscountMsg = "Discount must be a valid number.";
        }

        private bool CheckPrice(decimal price)
        {
            return price > 0 && Regex.IsMatch(price.ToString("0.##"), @"^\d+(\.\d{1,2})?$");
        }
        private bool CheckQuantity(ushort quantity)
        {
            return quantity <= 32767;
        }
        private bool CheckDiscount(ushort discount)
        {
            return discount < 100;
        }
    }
}