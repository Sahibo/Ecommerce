using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI;

public partial class AspNetUserLogin : IdentityUserLogin<string>
{
    public string LoginProvider { get; set; } = null!;

    public string ProviderKey { get; set; } = null!;

    public string? ProviderDisplayName { get; set; }
    public virtual AspNetUser User { get; set; } = null!;
}
