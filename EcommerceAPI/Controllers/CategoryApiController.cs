﻿using EcommerceAPI.DbContexts;
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
            var categories = await _dbContext.Categories.ToListAsync();
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
