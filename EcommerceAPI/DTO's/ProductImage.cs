using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EcommerceAPI;

public partial class ProductImage
{
    public int Id { get; set; }

    public byte[]? ImageData { get; set; }

    public string? Url { get; set; }

    public int ProductVariationId { get; set; }
    [JsonIgnore]
    public virtual ProductVariation ProductVariation { get; set; } = null!;
}
