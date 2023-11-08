using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ASP_Project.Areas.Identity.Data.Models;

public class ApplicationUser : IdentityUser
{
    //public string FirstName { get; set; }
    //public string LastName { get; set; }
    //public string? PhoneNumber { get; set; }
    
    //public int ShoppingCartId { get; set; }
    public ShoppingCart ShoppingCart { get; set; }
    
    public ICollection<Favorite> Favorites { get; set; }
    public ICollection<OnlinePayment>? OnlinePayments { get; set; }
    public ICollection<Order>? Orders { get; set; }
    public ICollection<Address>? Addresses { get; set; }

}

