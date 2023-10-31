using EcommerceAPI.DbContexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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

        // GET: api/Category
        [HttpGet("")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _dbContext.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpGet("Gender/{gender}")]
        public async Task<ActionResult<List<Product>>> GetProductsByGender(Gender gender)
        {
            var products = await _dbContext.Products.Where(p => p.Gender == (int)gender || p.Gender == (int)Gender.Unisex).ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }
    }
}
