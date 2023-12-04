using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Extensions;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ASP_Project.Areas.Admin.Controllers;
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
public class SubProductVariationController : Controller
{
	//private readonly IValidator<ProductVariation> _productVariationValidator;
       // private readonly IValidator<ProductVariation> _productVariationEditValidator;
        private readonly UserContext _dbContext;

        public SubProductVariationController(UserContext context)
        {
            _dbContext = context;
            // _productVariationValidator = productVariationValidator;
            // _productVariationEditValidator = productVariationEditValidator;
        }


        // public async Task<IActionResult> Index()
        // {
        //     var subProductVariations = await _dbContext.SubProductVariations.ToListAsync();
        //
        //     foreach (var subProductVariation in subProductVariations)
        //     {
        //         subProductVariation.ProductVariation =
        //             (await _dbContext.ProductVariations.FirstOrDefaultAsync(p => p.Id == subProductVariation.ProductVariationId))!;
        //     }
        //
        //
        //     return View(subProductVariations);
        //     
        //     
        // }
        public async Task<IActionResult> Index()
        {
            var subProductVariations = await _dbContext.SubProductVariations.ToListAsync();
       

            foreach (var subProductVariation in subProductVariations)
            {
                subProductVariation.ProductVariation = (await _dbContext.ProductVariations.FirstOrDefaultAsync(c => c.Id == subProductVariation.ProductVariationId))!;
            }

       

            if (subProductVariations != null)
            {
                return View(subProductVariations);
            }
            throw new ArgumentException("subProductVariations is not valid...");
        }
        
        public IActionResult Create(int? productVariationId)
        {
            if (productVariationId.HasValue)
            {
                var subProductVariation = new SubProductVariation { ProductVariationId = productVariationId.Value };
                return View(subProductVariation);
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(int productVariationId, SubProductVariation subProductVariation)
        {
            
            subProductVariation.ProductVariationId = productVariationId;

            if (subProductVariation.Discount != 0)
            {
                var percentPrice = (subProductVariation.Price * subProductVariation.Discount) / 100;
                subProductVariation.TotalPrice = subProductVariation.Price- percentPrice;
                
            }
            else
            {
                subProductVariation.TotalPrice = subProductVariation.Price;
            }
            await _dbContext.SubProductVariations.AddAsync(subProductVariation);
            await _dbContext.SaveChangesAsync();
            
            return View(subProductVariation);

        }

}