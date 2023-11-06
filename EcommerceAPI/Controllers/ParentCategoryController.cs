using EcommerceAPI.DbContexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [ApiController]
    [Route("ParentCategory")]
    public class ParentCategoryApiController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;

        public ParentCategoryApiController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Category
        [HttpGet("")]
        public async Task<ActionResult<List<ParentCategory>>> GetParentCategories()
        {
            var parentCategories = await _dbContext.ParentCategories.ToListAsync();
            return Ok(parentCategories);
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ParentCategory>> GetParentCategoryById(int id)
        {
            var parentCategory = await _dbContext.ParentCategories.FindAsync(id);

            if (parentCategory == null)
            {
                return NotFound();
            }

            return Ok(parentCategory);
        }
    }
}
