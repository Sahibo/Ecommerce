using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Make { get; set; } = null!;

    public int Gender { get; set; }

    public string Fabric { get; set; } = null!;

    public string Description { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<ProductVariation> ProductVariations { get; set; } = new List<ProductVariation>();
}
