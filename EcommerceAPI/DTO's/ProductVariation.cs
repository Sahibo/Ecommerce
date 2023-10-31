﻿using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class ProductVariation
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public string Size { get; set; } = null!;

    public int Color { get; set; }

    public short Quantity { get; set; }

    public short Discount { get; set; }

    public bool? IsDeleted { get; set; }

    public int ProductId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ShoppingCartItem? ShoppingCartItem { get; set; }
}
