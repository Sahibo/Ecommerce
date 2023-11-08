using EcommerceAPI.DbContexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : ControllerBase
    {
        
        public class UserRegistrationModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        
        private readonly EcommerceContext _dbContext;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly IUserStore<AspNetUser> _userStore;

        // role manager add 
        public UserController(EcommerceContext dbContext,
            UserManager<AspNetUser> userManager,
            IUserStore<AspNetUser> userStore)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userStore = userStore;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            if (!_dbContext.AspNetUsers.Any(a => a.Email == model.Email))
            {
                var newUser = new AspNetUser { 
                    Email = model.Email, 
                    NormalizedEmail = model.Email.ToUpper()
                };

                await _userStore.SetUserNameAsync(newUser, model.Email, CancellationToken.None);
                await _userManager.GetUserIdAsync(newUser);

                var result = await _userManager.CreateAsync(newUser, model.Password);


                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newUser, "User");
                    return Ok("Registration successful");
                }
                return BadRequest("Error");
                
            }
            return BadRequest("Email is invalid or already taken");
        }

        //gold_wolverine@mail.ru
        //Fidan12346!

    }
}
