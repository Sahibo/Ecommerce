using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI;

public partial class AspNetRoleClaim : IdentityRoleClaim<string>
{

    public string? ClaimType { get; set; }

    public string? ClaimValue { get; set; }

    public virtual AspNetRole Role { get; set; } = null!;
}
