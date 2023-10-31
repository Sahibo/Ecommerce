using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class OrderStateHistory
{
    public int Id { get; set; }

    public int State { get; set; }

    public DateTime DateChanged { get; set; }

    public int OrderProductId { get; set; }

    public virtual OrderProduct OrderProduct { get; set; } = null!;
}
