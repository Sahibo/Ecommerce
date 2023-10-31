using EcommerceAPI.DbContexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

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

        //// POST: api/Category
        //[HttpPost]
        //public async Task<ActionResult<Category>> CreateParentCategory(Category category)
        //{
        //    _dbContext.Categories.Add(category);
        //    await _dbContext.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        //}

        //// PUT: api/Category/{id}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateCategory(int id, Category category)
        //{
        //    var existingCategory = await _dbContext.Categories.FindAsync(id);

        //    if (existingCategory == null)
        //    {
        //        return NotFound();
        //    }

        //    existingCategory.Name = category.Name;
        //    existingCategory.IsDeleted = category.IsDeleted;
        //    existingCategory.ParentCategoryId = category.ParentCategoryId;

        //    _dbContext.Entry(existingCategory).State = EntityState.Modified;

        //    try
        //    {
        //        await _dbContext.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CategoryExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        //// DELETE: api/Category/{id}
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Category>> DeleteCategory(int id)
        //{
        //    var category = await _dbContext.Categories.FindAsync(id);
        //    if (category == null)
        //    {
        //        return NotFound();
        //    }

        //    _dbContext.Categories.Remove(category);
        //    await _dbContext.SaveChangesAsync();

        //    return category;
        //}

        //private bool CategoryExists(int id)
        //{
        //    return _dbContext.Categories.Any(c => c.Id == id);
        //}
    }
}
