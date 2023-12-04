namespace ASP_Project.Areas.Identity.Data.Models
{
    public class ShoppingCartItem
    {
        //public int Id { get; set; }
        public short Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    
        public int SubProductVariationId { get; set; }
        public SubProductVariation SubProductVariation { get; set; }
    
        public string ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }

    }
}