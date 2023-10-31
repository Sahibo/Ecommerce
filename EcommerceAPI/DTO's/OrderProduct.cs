using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class OrderProduct
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public decimal TotalPrice { get; set; }

    public int OrderId { get; set; }

    public int ShoppingCartItemId { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ICollection<OrderStateHistory> OrderStateHistories { get; set; } = new List<OrderStateHistory>();

    public virtual ShoppingCartItem ShoppingCartItem { get; set; } = null!;
}
