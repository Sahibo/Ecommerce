using Microsoft.AspNetCore.Mvc;

namespace EcommerceAPI.Controllers
{
    public class ShoppingCartApiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
