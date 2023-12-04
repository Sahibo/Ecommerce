using System.Linq;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
	[ApiController]
	[Route("Product")]
	public class ProductApiController : ControllerBase
	{

		private readonly EcommerceContext _dbContext;

		public ProductApiController(EcommerceContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("")]
		public async Task<ActionResult<List<Product>>> GetProducts()
		{
			var products = await _dbContext.Products
				.Where(p => p.IsDeleted == false && p.ProductVariations.Any())
				.Include(p => p.ProductVariations
					.Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
					.ThenInclude(pv => pv.ProductImages)
				.Include(p => p.ProductVariations
					.Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
					.ThenInclude(pv => pv.SubProductVariations)
				.ToListAsync();

			return Ok(products);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Product>> GetProductById(int id)
		{
		    var productVariations = await _dbContext.ProductVariations
		        .Where(pv => pv.ProductId == id).ToListAsync();

		    var product = await _dbContext.Products
		        .Include(p => p.ProductVariations)
					.ThenInclude(pv => pv.ProductImages)
		        .Include(p => p.ProductVariations)
					.ThenInclude(pv => pv.SubProductVariations)
		        .FirstOrDefaultAsync(p => p.Id == id);

		    if (product == null)
		    {
		        return NotFound();
		    }

		    product.ProductVariations = productVariations;

		    return Ok(product);
		}

		[HttpGet("{id}/ProductVariations")]
		public async Task<ActionResult<List<Product>>> GetAllProductVariations(int id)  // ???
		{
		    var productVariations = await _dbContext.ProductVariations.Where(pv => pv.ProductId == id).
		        Include(pv => pv.ProductImages).ToListAsync();

		    return Ok(productVariations);
		}

		[HttpGet("Gender/{gender}")]
		public async Task<ActionResult<List<Product>>> GetProductsByGender(Gender gender)
		{
		    var products = await _dbContext.Products
		        .Where(p => p.Category.ParentCategory.Gender == gender && p.IsDeleted == false && p.ProductVariations.Any())
		        .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
					.ThenInclude(pv => pv.ProductImages)
		        .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
					.ThenInclude(pv => pv.SubProductVariations.Where(spv => spv.IsDeleted == false))
		        .ToListAsync();
		    
		    if (!products.Any())
		    {
		        return NotFound();
		    }

		    return Ok(products);
		}

		[HttpGet("Category/{id}")]
		public async Task<ActionResult<List<Product>>> GetProductsByCategory(int id)
		{
		    var products = await _dbContext.Products
		        .Where(p => p.Category.Id == id && p.IsDeleted == false && p.ProductVariations.Any())
		        .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
					.ThenInclude(pv => pv.ProductImages)
		        .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
					.ThenInclude(pv => pv.SubProductVariations.Where(spv => spv.IsDeleted == false))
		        .ToListAsync();

		    if (!products.Any())
		    {
		        return NotFound();
		    }

		    return Ok(products);
		}
	}
}
