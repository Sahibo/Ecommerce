using System;
using System.Collections.Generic;

namespace EcommerceAPI;

public partial class ParentCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
