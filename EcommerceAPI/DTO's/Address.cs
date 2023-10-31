using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class Address
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public string Country { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Region { get; set; } = null!;

    public string StreetAddress { get; set; } = null!;

    public string? StreetAddressSecond { get; set; }

    public string Zip { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public virtual AspNetUser User { get; set; } = null!;
}
