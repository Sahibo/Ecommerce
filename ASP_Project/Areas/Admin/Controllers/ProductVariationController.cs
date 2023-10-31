using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Extensions;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ASP_Project.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
	
    public class ProductVariationController : Controller
    {
        private readonly IValidator<ProductVariation> _productVariationValidator;
        private readonly IValidator<ProductVariation> _productVariationEditValidator;
        private readonly UserContext _dbContext;

        public ProductVariationController(UserContext context, IValidator<ProductVariation> productVariationValidator,
	        IValidator<ProductVariation> productVariationEditValidator)
        {
            _dbContext = context;
            _productVariationValidator = productVariationValidator;
            _productVariationEditValidator = productVariationEditValidator;
        }


        public async Task<IActionResult> Index()
        {
            var productVariations = await _dbContext.ProductVariations.ToListAsync();
            var productImages = await _dbContext.ProductImages.ToListAsync();

            foreach (var productVariation in productVariations)
            {
                productVariation.Product =
                    (await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productVariation.ProductId))!;
            }

            ViewBag.ProductImages = productImages;

            return View(productVariations);
        }

        public IActionResult Create(int? productId)
        {
            if (productId.HasValue)
            {
                var productVariation = new ProductVariation { ProductId = productId.Value };
                return View(productVariation);
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(int productId, ProductVariation productVariation,
            IFormFileCollection files)
        {
            ModelState.Clear();
            productVariation.ProductId = productId;

            productVariation.Name = $"{productVariation.Color} {productVariation.Size}";
            var result = await _productVariationValidator.ValidateAsync(productVariation);

            if (result.IsValid)
            {
                await _dbContext.ProductVariations.AddAsync(productVariation);
                await _dbContext.SaveChangesAsync();

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            var imageBytes = memoryStream.ToArray();

                            var productImage = new ProductImage
                            {
                                ImageData = imageBytes,
                                ProductVariationId = productVariation.Id
                            };

                            await _dbContext.ProductImages.AddAsync(productImage);


                            await _dbContext.SaveChangesAsync();

                        }
                    }
                    else
                        return NotFound();
                }
            }
            result.AddToModelState(this.ModelState);
            return View(productVariation);

        }
        
        public async Task<IActionResult> Edit(int id)
        {
	        var productVariation = await _dbContext.ProductVariations
                .Include(pv => pv.ProductImages)
                .FirstOrDefaultAsync(pv => pv.Id == id);

            if (productVariation == null)
            {
                return NotFound();
            }
            ViewBag.ProductImages = productVariation.ProductImages;

            return View( productVariation);
        }

        [HttpPost] 
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ProductVariation productVariation, List<ProductImage> productImages)
        {
            var result = await _productVariationEditValidator.ValidateAsync(productVariation);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);
                ViewBag.ProductImages = productImages;   // Error: null
                return View(productVariation);
            }

            var existingProductVariation = await _dbContext.ProductVariations
                .FirstOrDefaultAsync(pv => pv.Id == productVariation.Id);

            if (existingProductVariation == null)
            {
                return NotFound();
            }

            existingProductVariation.Price = productVariation.Price;
            existingProductVariation.Quantity = productVariation.Quantity;
            existingProductVariation.Discount = productVariation.Discount;

            _dbContext.ProductVariations.Update(existingProductVariation);

            await _dbContext.SaveChangesAsync();

            var updatedProductImages = await _dbContext.ProductImages
                .Where(p => p.ProductVariationId == productVariation.Id)
                .ToListAsync();

            ViewBag.ProductImages = updatedProductImages;

            TempData["success"] = "Product Variation updated successfully";

            return View(existingProductVariation);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteImages([FromBody] List<int> selectedImageIds)
        {
	        if (selectedImageIds.Count == 0)
	        {
		        return Json(new { success = false, message = "No images selected for deletion" });
	        }
	        
	        foreach (var imageId in selectedImageIds)
	        {
		        var imageToDelete = await _dbContext.ProductImages.FirstOrDefaultAsync(p => p.Id == imageId);
		        if (imageToDelete != null)
		        {
			        _dbContext.ProductImages.Remove(imageToDelete);
		        }
	        }

	        await _dbContext.SaveChangesAsync();
	        ViewBag.ProductImages = _dbContext.ProductImages;


			return Json(new { success = true, message = "Images deleted successfully" });
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddImages(IFormFileCollection files, int productVariationId)
        {
	        if (files.Count <= 0)
	        {
		        return Json(new {success = false, message = "No images were provided for addition"});
	        }
	        
	        foreach (var file in files)
	        {
		        if (file.Length > 0)
		        {
			        using (var memoryStream = new MemoryStream())
			        {
				        await file.CopyToAsync(memoryStream);
				        var imageBytes = memoryStream.ToArray();

				        var existingProductVariation = await _dbContext.ProductVariations
					        .FirstOrDefaultAsync(pv => pv.Id == productVariationId);

				        if (existingProductVariation != null)
				        {
					        var productImage = new ProductImage
					        {
						        ImageData = imageBytes,
						        ProductVariationId = existingProductVariation.Id
					        };

					        _dbContext.ProductImages.Add(productImage);
				        }
			        }
		        }
	        }
	        await _dbContext.SaveChangesAsync();
	        
	        ViewBag.ProductImages = _dbContext.ProductImages;
	        return Json(new { success = true, message = "Images added successfully" });
        }
    }
}