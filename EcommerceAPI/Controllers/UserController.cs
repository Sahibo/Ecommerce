using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;
 
namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : ControllerBase
    {
 
        // prover rabotaet li bez nix
        public class UserModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
 
        public class UserLoginModel : UserModel
        {
            public bool RememberMe { get; set; } = true;
        }
 
 
        private readonly EcommerceContext _dbContext;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly IUserStore<AspNetUser> _userStore;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<AspNetUser> _signInManager;
 
        // role manager add 
        public UserController(EcommerceContext dbContext,
            UserManager<AspNetUser> userManager,
            IUserStore<AspNetUser> userStore,
            SignInManager<AspNetUser> signInManager,
            IConfiguration configuration)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userStore = userStore;
            _signInManager = signInManager;
            _configuration = configuration;
 
        }
 
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
                    if (result.Succeeded)
                    {
                        var tokenString = GenerateTokenString(user);
                        return Ok(new { UserId = user.Id, Token = tokenString });
                    }
                    return BadRequest("Invalid login attempt");
                }
            }
            return BadRequest("Not valid attempt");
 
        }
 
 
        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] UserModel model)
        {
            if (Regex.IsMatch(model.Email, "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            {
                if (Regex.IsMatch(model.Password, "^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=-_'.!]).{6,40}$"))
                {
                    if (!_dbContext.AspNetUsers.Any(a => a.Email == model.Email))
                    {
                        var newUser = new AspNetUser
                        {
                            Email = model.Email,
                            NormalizedEmail = model.Email.ToUpper()
                        };
 
                        await _userStore.SetUserNameAsync(newUser, model.Email, CancellationToken.None);
                        await _userManager.GetUserIdAsync(newUser);
 
                        var result = await _userManager.CreateAsync(newUser, model.Password);
 
 
                        if (result.Succeeded)
                        {
                            await CreateUserShoppingCart(newUser.Id);
                            var tokenString = GenerateTokenString(newUser);
                            await _dbContext.SaveChangesAsync();
 
                            return Ok(new { UserId = newUser.Id, Token = tokenString });
                        }
                        return BadRequest("Registration failed");
 
                    }
                    return BadRequest("Email is invalid or already taken");
                }
                return BadRequest("Password must be more than 6 and less than 40 characters long and special symbol");
            }
            return BadRequest("Email is not in correct format");
        }
 
        [HttpPost("CreateUserShoppingCart/{userId}")]
        public async Task<IActionResult> CreateUserShoppingCart(string userId)
        {
            var userShoppingCart = new ShoppingCart
            {
                UserId = userId,
            };
            await _dbContext.ShoppingCarts.AddAsync(userShoppingCart);
            return Ok("Shopping cart created successfully");
        }
 
 
        private string GenerateTokenString(AspNetUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Role,"User"),
            };
 
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));
 
            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
 
            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _configuration.GetSection("Jwt:Issuer").Value,
                audience: _configuration.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);
 
            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
 
        [HttpPost("AddFavorite/{userId}/{productId}")]
        public async Task<IActionResult> AddFavById(string userId, int productId)
        {
            var user = await _dbContext.AspNetUsers.FindAsync(userId);
 
            if (user == null)
            {
                return NotFound("User not found");
            }
 
            //var existingFavorite = await _dbContext.Favorites
            //    .FirstOrDefaultAsync(f => f.UserId == user.Id && f.ProductVariationId == productId);
 
 
            var newFavorite = new Favorite
            {
                UserId = user.Id,
                SubProductVariationId = productId
            };
 
            _dbContext.Favorites.Add(newFavorite);
            await _dbContext.SaveChangesAsync();
            return Ok("Favorite added successfully");
        }
 
        [HttpPost("DeleteFavorite/{userId}/{productId}")]
        public async Task<IActionResult> DeleteFavById(string userId, int productId)
        {
            var user = await _dbContext.AspNetUsers.FindAsync(Convert.ToString(userId));
 
            if (user == null)
            {
                return NotFound("User not found");
            }
 
            var favoriteToDelete = await _dbContext.Favorites
                .FirstOrDefaultAsync(f => f.UserId == user.Id && f.SubProductVariationId == productId);
 
            if (favoriteToDelete == null)
            {
                return NotFound("Favorite not found");
            }
 
            _dbContext.Favorites.Remove(favoriteToDelete);
            await _dbContext.SaveChangesAsync();
 
            return Ok("Favorite deleted successfully");
        }
 
        [HttpPost("ShowFavorites/{userId}")]
 
        public async Task<IActionResult> ShowFavorites(string userId)
        {
            var user = await _dbContext.AspNetUsers
                .Include(u => u.Favorites)
                .FirstOrDefaultAsync(u => u.Id == Convert.ToString(userId));
 
            if (user == null)
            {
                return NotFound("User not found");
            }
 
            var favorites = user.Favorites;
            return Ok(favorites);
        }
    }
}