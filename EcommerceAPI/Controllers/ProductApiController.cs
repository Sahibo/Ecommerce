using EcommerceAPI.DbContexts;
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
                .Where(p=> p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false && pv.ProductImages.Any()))
                .ThenInclude(pv => pv.ProductImages)
                .ToListAsync();
 
            return Ok(products);
        }
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Product>> GetProductById(int id)
        // {
        //     var product = await _dbContext.Products
        //         .Include(p => p.ProductVariations.FirstOrDefault(pv => pv.Id == id))
        //         .ThenInclude(pv => pv.ProductImages);
        //     
        //     
        //     
        //     if (product == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return Ok(product);
        // }
        [HttpGet("{id}/ProductVariations")]
        public async Task<ActionResult<List<Product>>> GetAllProductVariations(int id)
        {
            var productVariations = await _dbContext.ProductVariations.Where(pv => pv.ProductId == id).
                Include(pv => pv.ProductImages).ToListAsync();
 
            return Ok(productVariations);
        }
        

        [HttpGet("Gender/{gender}")]
        public async Task<ActionResult<List<Product>>> GetProductsByGender(Gender gender)
        {
            var products = await _dbContext.Products
                .Where(p => (p.Gender == (int)gender || p.Gender == (int)Gender.Unisex) && p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
                .ThenInclude(pv => pv.ProductImages)
                .ToListAsync();
    
            if (!products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }
    }
}
