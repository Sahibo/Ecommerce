﻿namespace EcommerceDb.Models
{
	public class ShoppingCart
    {
        //public int Id { get; set; }
        public short TotalQuantity { get; set; }
        public decimal TotalPrice { get; set; }
    
        public string UserId { get; set; }
        public AspNetUser User { get; set; }
    
        public ICollection<ShoppingCartItem>? ShoppingCartItems { get; set; }
    }
}