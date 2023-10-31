using ASP_Project.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using ASP_Project.Areas.Identity.Data.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace ASP_Project.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserContext _dbContext;

        public HomeController(ILogger<HomeController> logger, UserContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Products()
        {
            return View();
        }
        
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _dbContext.Products.ToList(); // Fetch products from a service
            return Ok(products); // Assuming ProductService returns products
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}