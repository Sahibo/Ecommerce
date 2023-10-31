using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class OnlinePayment
{
    public int Id { get; set; }

    public string CardNumber { get; set; } = null!;

    public string CardHolderName { get; set; } = null!;

    public string CardHolderSurname { get; set; } = null!;

    public string ExpirationDate { get; set; } = null!;

    public string Cvv { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public virtual AspNetUser User { get; set; } = null!;
}
