// using EcommerceDb.DbContexts;
// using EcommerceDb.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using System;
// using System.Threading.Tasks;
//  
// namespace EcommerceAPI.Controllers
// {
//     [ApiController]
//     [Route("ShoppingCartItem")]
//     public class ShoppingCartItemApiController : ControllerBase
//     {
//         private readonly EcommerceContext _dbContext;
//  
//         public ShoppingCartItemApiController(EcommerceContext dbContext)
//         {
//             _dbContext = dbContext;
//         }
//  
//         // delete from cart
//         // increase decrease
//  
//         [HttpPost("AddToCart/{userId}/{productId}")]
//         public async Task<IActionResult> AddItem(string userId, int productId)
//         {
//             var user = await _dbContext.AspNetUsers.FindAsync(userId);
//         
//             if (user == null)
//             {
//                 return NotFound("User not found");
//             }
//         
//             var existingItem = await _dbContext.ShoppingCartItems
//                 .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.ProductVariationId == productId);
//         
//             if (existingItem != null)
//             {
//                 existingItem.Quantity++;
//             }
//             else
//             {
//         
//                 var newItem = new ShoppingCartItem
//                 {
//                     ProductVariationId = productId,
//                     Quantity = 1,
//                     ShoppingCartId = userId,
//                 };
//                 _dbContext.ShoppingCartItems.Add(newItem);
//         
//                 var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(userId);
//                 shoppingCart?.ShoppingCartItems.Add(newItem);
//             }
//         
//             await _dbContext.SaveChangesAsync();
//         
//             return Ok("Item added to cart successfully");
//         }
//         
//         [HttpPost("DeleteFromCart/{userId}/{productId}")]
//         public async Task<IActionResult> DeleteItem(string userId, int productId)
//         {
//             var user = await _dbContext.AspNetUsers.FindAsync(userId);
//         
//             if (user == null)
//             {
//                 return NotFound("User not found!");
//             }
//         
//             var shoppingCartItem = await _dbContext.ShoppingCartItems
//                 .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.ProductVariationId == productId);
//         
//             if (shoppingCartItem != null)
//             {
//                 _dbContext.ShoppingCartItems.Remove(shoppingCartItem);
//                 await _dbContext.SaveChangesAsync();
//         
//                 return Ok("Item removed from cart successfully");
//             }
//         
//             return NotFound("Item not found in the cart!");
//         }
//         
//         [HttpPost("Increase/{userId}/{productId}")]
//         
//         public async Task<IActionResult> Increase(string userId, int productId)
//         {
//             var user = await _dbContext.AspNetUsers.FindAsync(userId);
//         
//             if (user == null)
//             {
//                 return NotFound("User not found!");
//             }
//         
//             var shoppingCartItem = await _dbContext.ShoppingCartItems
//                 .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.ProductVariationId == productId);
//         
//             if (shoppingCartItem != null)
//             {
//                 shoppingCartItem.Quantity++;
//                 _dbContext.ShoppingCartItems.Update(shoppingCartItem);
//                 await _dbContext.SaveChangesAsync();
//         
//                 return Ok("Item's quantity increased successfully");
//             }
//         
//             return NotFound("Item not found in the cart!");
//         }
//         [HttpPost("Decrease/{userId}/{productId}")]
//         
//         public async Task<IActionResult> Decrease(string userId, int productId)
//         {
//             var user = await _dbContext.AspNetUsers.FindAsync(userId);
//         
//             if (user == null)
//             {
//                 return NotFound("User not found!");
//             }
//         
//             var shoppingCartItem = await _dbContext.ShoppingCartItems
//                 .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.ProductVariationId == productId);
//         
//             if (shoppingCartItem != null)
//             {
//                 shoppingCartItem.Quantity--;
//                 _dbContext.ShoppingCartItems.Update(shoppingCartItem);
//                 await _dbContext.SaveChangesAsync();
//         
//                 return Ok("Item's quantity decreased successfully");
//             }
//         
//             return NotFound("Item not found in the cart!");
//         }
//     }
// }