using ASP_Project.Areas.Identity.Data.DbContexts;
using ASP_Project.Areas.Identity.Data.Extensions;
using ASP_Project.Areas.Identity.Data.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace ASP_Project.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Admin")]
public class ProductController : Controller
{
    private IValidator<Product> _productValidator { get; set; }

    private readonly UserContext _dbContext;

    public ProductController(UserContext context, IValidator<Product> validator)
    {
        _dbContext = context;
        _productValidator = validator;
    }

    public async Task<IActionResult> Index()
    {
        var products = await _dbContext.Products.ToListAsync();
       

        foreach (var product in products)
        {
            product.Category = (await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == product.CategoryId))!;
        }

       

        if (products != null)
        {
            return View(products);
        }
        throw new ArgumentException("Product is not valid...");
    }


    public IActionResult Create()
    {
        return View();
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Product? product)
    {
        var result = await _productValidator.ValidateAsync(product);

        if (result.IsValid)
        {
            await _dbContext.Products.AddAsync(product);
            await _dbContext.SaveChangesAsync();
            
        }

        result.AddToModelState(this.ModelState);

        return View(product);
    }


    public async Task<IActionResult> Edit(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return View(product);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(Product product)
    {
        var result = await _productValidator.ValidateAsync(product);

        if (result.IsValid)
        {
            _dbContext.Products.Update(product);
            await _dbContext.SaveChangesAsync();
            TempData["success"] = "Product updated successfully";

            return RedirectToAction("Index", "Product");
        }
        result.AddToModelState(this.ModelState);

        return View(product);
    }


    public async Task<IActionResult> Delete(int id)
    {
        var product = await _dbContext!.Products!.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return View(product);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeletePost(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        if (_dbContext.ProductVariations.Any(c => c.ProductId == id))
        {
            ModelState.AddModelError("ProductVariations", "Cannot delete the product because it is associated with one or more variations.");
            return View(product);
        }

        
        product.IsDeleted = true;
        _dbContext.Products.Update(product);
        await _dbContext.SaveChangesAsync();
        TempData["Success"] = "Product was deleted successfully";

        return RedirectToAction("Index");
    }


    public async Task<IActionResult> AddVariation(int id)
    {
        var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product != null)
        {
            return RedirectToAction("Create", "ProductVariation", new { productId = id });
        }
        
        return NotFound();
    }
    
}