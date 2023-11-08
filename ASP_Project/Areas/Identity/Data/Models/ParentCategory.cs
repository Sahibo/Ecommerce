namespace ASP_Project.Areas.Identity.Data.Models
{
    public class ParentCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

		public ICollection<Category>? Categories { get; set; }
    }
}