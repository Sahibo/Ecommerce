using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI;

public partial class AspNetUserToken : IdentityUserToken<string>
{
    public string LoginProvider { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Value { get; set; }

    public virtual AspNetUser User { get; set; } = null!;
}