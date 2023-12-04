using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("ProductVariation")]
    public class ProductVariationController : ControllerBase
    {

        private readonly EcommerceContext _dbContext;

        public ProductVariationController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductVariation>> GetProductVariationById(int id)
        {
            var product = await _dbContext.Products
                .FirstOrDefaultAsync(p => p.ProductVariations.Any(pv => pv.Id == id));

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}