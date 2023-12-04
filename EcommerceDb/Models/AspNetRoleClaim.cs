using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models;


public partial class AspNetRoleClaim : IdentityRoleClaim<string>
{
    public virtual AspNetRole Role { get; set; } = null!;
}
