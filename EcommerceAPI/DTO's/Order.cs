using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class Order
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int TotalQuantity { get; set; }

    public decimal TotalPrice { get; set; }

    public int DeliveryState { get; set; }

    public int PaymentMethod { get; set; }

    public string UserId { get; set; } = null!;

    public int ShoppingCartId { get; set; }

    public string ShoppingCartUserId { get; set; } = null!;

    public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

    public virtual ShoppingCart ShoppingCartUser { get; set; } = null!;

    public virtual AspNetUser User { get; set; } = null!;
}
