using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 
namespace EcommerceAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [ApiController]
    [Route("Category")]
    public class CategoryApiController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;
 
        public CategoryApiController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }
 
        // GET: api/Category
        [HttpGet("")]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _dbContext.Categories
                .Where(c => c.IsDeleted == false && c.Products.Any())
                .ToListAsync();
 
            return Ok(categories);
        }
 
        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);
 
            if (category == null)
            {
                return NotFound();
            }
 
            return Ok(category);
        }
 
    }
}