using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI;

public partial class AspNetUserLogin : IdentityUserLogin<string>
{
    public virtual AspNetUser User { get; set; } = null!;
}
