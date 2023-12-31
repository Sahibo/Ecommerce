﻿namespace ASP_Project.Areas.Identity.Data.Models
{
    public class OnlinePayment
    {
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public string CardHolderName { get; set; }
        public string CardHolderSurname { get; set; }
        public string ExpirationDate { get; set; }
        public string CVV { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}