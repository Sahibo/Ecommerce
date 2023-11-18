using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EcommerceAPI;
public enum Gender : int
{
    Man = 0,
    Woman = 1,
    Unisex = 2
}
public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Make { get; set; } = null!;

    public string Fabric { get; set; } = null!;

    public string Description { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public int CategoryId { get; set; }
    [JsonIgnore]
    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<ProductVariation> ProductVariations { get; set; } = new List<ProductVariation>();
}
