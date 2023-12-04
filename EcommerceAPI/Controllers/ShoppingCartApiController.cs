// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using EcommerceDb.DbContexts;
// using EcommerceDb.Models;
// using System.Linq;
// using System.Threading.Tasks;
//  
// namespace EcommerceAPI.Controllers
// {
//     [ApiController]
//     [Route("ShoppingCart")]
//     public class ShoppingCartApiController : ControllerBase
//     {
//         private readonly EcommerceContext _dbContext;
//  
//         public ShoppingCartApiController(EcommerceContext dbContext)
//         {
//             _dbContext = dbContext;
//         }
//  
//         [HttpGet("GetAllItems/{userId}")]
//         public async Task<IActionResult> GetAllItems(string userId)
//         {
//             var shoppingCart = await _dbContext.ShoppingCarts
//                 .Include(cart => cart.ShoppingCartItems)
//                 .FirstOrDefaultAsync(cart => cart.UserId == userId);
//  
//             if (shoppingCart == null)
//             {
//                 return NotFound("Shopping cart not found");
//             }
//  
//             var shoppingCartItems = shoppingCart.ShoppingCartItems.ToList();
//  
//             return Ok(shoppingCartItems);
//         }
//  
//     }
// }