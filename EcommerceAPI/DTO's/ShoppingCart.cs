using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class ShoppingCart
{
    public string UserId { get; set; } = null!;

    public short TotalQuantity { get; set; }

    public decimal TotalPrice { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();

    public virtual AspNetUser User { get; set; } = null!;
}
