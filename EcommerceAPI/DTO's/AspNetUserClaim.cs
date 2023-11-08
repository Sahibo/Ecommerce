using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI;

public partial class AspNetUserClaim : IdentityUserClaim<string>
{
    public string? ClaimType { get; set; }

    public string? ClaimValue { get; set; }

    public virtual AspNetUser User { get; set; } = null!;
}
