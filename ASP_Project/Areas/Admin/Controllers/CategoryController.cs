using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Extensions;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ASP_Project.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class CategoryController : Controller
    {
        private IValidator<Category> _categoryValidator { get; set; }

        private readonly UserContext _dbContext;

        public CategoryController(UserContext context, IValidator<Category> validator)
        {
            _dbContext = context;
            _categoryValidator = validator;
        }

        public IActionResult Index()
        {
            var categories = _dbContext.Categories.ToList();
            if (categories != null)
            {
                return View(categories);
            }
            throw new ArgumentException("Category is not valid...");
        }


        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Category category)
        {
	        ModelState.Clear();
			var result = await _categoryValidator.ValidateAsync(category);

            if (result.IsValid)
            {
                await _dbContext.Categories.AddAsync(category);
                await _dbContext.SaveChangesAsync();
                TempData["Success"] = "Category created successfully";
                return RedirectToAction("Index", "Category");
            }
            result.AddToModelState(this.ModelState);

            return View(category);
        }



        public IActionResult Edit(int id)
        {
            var category = _dbContext.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Edit(Category category)
		{
			ModelState.Clear();
			var result = await _categoryValidator.ValidateAsync(category);

			if (!result.IsValid)
			{
				result.AddToModelState(ModelState);
				return View(category);
			}
			var existingCategory = _dbContext.Categories.FirstOrDefault(c => c.Id == category.Id);

			if (existingCategory == null) return NotFound();

			existingCategory.Name = category.Name;

			await _dbContext.SaveChangesAsync();

			TempData["success"] = "Category updated successfully";
			return RedirectToAction("Index", "Category");
		}


		public IActionResult Delete(int id)
        {
            var category = _dbContext!.Categories!.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeletePost(int id)
        {
	        var category = _dbContext.Categories.Find(id);

            if (category == null)
            {
	            return NotFound();
            }

            if (_dbContext.Products.Any(c => c.CategoryId == id))
            {
	            ModelState.AddModelError("Products", "Cannot delete the category because it is associated with one or more products.");
	            return View(category);
            }

            category.IsDeleted = true;
            _dbContext.Categories.Update(category);
            _dbContext.SaveChanges();
            TempData["Success"] = "Parent category was deleted successfully";

            return RedirectToAction("Index");
		}
    }
}
