using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class ShoppingCartItem
{
    public int ProductVariationId { get; set; }

    public short Quantity { get; set; }

    public decimal TotalPrice { get; set; }

    public string ShoppingCartId { get; set; } = null!;

    public virtual OrderProduct? OrderProduct { get; set; }

    public virtual ProductVariation ProductVariation { get; set; } = null!;

    public virtual ShoppingCart ShoppingCart { get; set; } = null!;
}
