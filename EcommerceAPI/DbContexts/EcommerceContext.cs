using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.DbContexts;

public partial class EcommerceContext : IdentityDbContext<AspNetUser>
{
    public EcommerceContext()
    {
    }

    public EcommerceContext(DbContextOptions<EcommerceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<OnlinePayment> OnlinePayments { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderProduct> OrderProducts { get; set; }

    public virtual DbSet<OrderStateHistory> OrderStateHistories { get; set; }

    public virtual DbSet<ParentCategory> ParentCategories { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<ProductVariation> ProductVariations { get; set; }

    public virtual DbSet<ShoppingCart> ShoppingCarts { get; set; }

    public virtual DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }
    public virtual DbSet<Favorite> Favorites { get; set; } // New DbSet for Favorites


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ECommerce;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Ignore<IdentityUser>();
        modelBuilder.Ignore<IdentityRole>();
        
        
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_Addresses_UserId");

            entity.Property(e => e.Zip).HasColumnName("ZIP");

            entity.HasOne(d => d.User).WithMany(p => p.Addresses).HasForeignKey(d => d.UserId);
        });
        
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_Addresses_UserId");
            entity.HasIndex(e => e.ProductVariationId, "IX_Addresses_ProductVariationId");

            entity.HasOne(f => f.User).WithMany(p => p.Favorites).HasForeignKey(f => f.UserId);
            entity.HasOne(f => f.ProductVariation).WithMany(p => p.Favorites).HasForeignKey(f => f.ProductVariationId);

        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasIndex(e => e.Name, "IX_Categories_Name").IsUnique();

            entity.HasIndex(e => e.ParentCategoryId, "IX_Categories_ParentCategoryId");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasDefaultValueSql("(CONVERT([bit],(0)))");
            entity.Property(e => e.Name).HasMaxLength(25);

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.Categories)
                .HasForeignKey(d => d.ParentCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<OnlinePayment>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_OnlinePayments_UserId");

            entity.Property(e => e.CardHolderName).HasMaxLength(255);
            entity.Property(e => e.CardHolderSurname).HasMaxLength(255);
            entity.Property(e => e.CardNumber).HasMaxLength(16);
            entity.Property(e => e.Cvv)
                .HasMaxLength(3)
                .HasColumnName("CVV");
            entity.Property(e => e.ExpirationDate).HasMaxLength(5);

            entity.HasOne(d => d.User).WithMany(p => p.OnlinePayments).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.ShoppingCartUserId, "IX_Orders_ShoppingCartUserId");

            entity.HasIndex(e => e.UserId, "IX_Orders_UserId");

            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.ShoppingCartUser).WithMany(p => p.Orders).HasForeignKey(d => d.ShoppingCartUserId);

            entity.HasOne(d => d.User).WithMany(p => p.Orders).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<OrderProduct>(entity =>
        {
            entity.HasIndex(e => e.OrderId, "IX_OrderProducts_OrderId");

            entity.HasIndex(e => e.ShoppingCartItemId, "IX_OrderProducts_ShoppingCartItemId").IsUnique();

            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderProducts).HasForeignKey(d => d.OrderId);

            entity.HasOne(d => d.ShoppingCartItem).WithOne(p => p.OrderProduct).HasForeignKey<OrderProduct>(d => d.ShoppingCartItemId);
        });

        modelBuilder.Entity<OrderStateHistory>(entity =>
        {
            entity.HasIndex(e => e.OrderProductId, "IX_OrderStateHistories_OrderProductId");

            entity.HasOne(d => d.OrderProduct).WithMany(p => p.OrderStateHistories).HasForeignKey(d => d.OrderProductId);
        });

        modelBuilder.Entity<ParentCategory>(entity =>
        {
            entity.HasIndex(e => e.Name, "IX_ParentCategories_Name").IsUnique();

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasDefaultValueSql("(CONVERT([bit],(0)))");
            entity.Property(e => e.Name).HasMaxLength(25);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasIndex(e => e.CategoryId, "IX_Products_CategoryId");

            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.Fabric).HasMaxLength(100);
            entity.Property(e => e.Gender).HasDefaultValueSql("((2))");
            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasDefaultValueSql("(CONVERT([bit],(0)))");
            entity.Property(e => e.Make).HasMaxLength(25);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasIndex(e => e.ProductVariationId, "IX_ProductImages_ProductVariationId");

            entity.Property(e => e.Url).HasMaxLength(255);

            entity.HasOne(d => d.ProductVariation).WithMany(p => p.ProductImages).HasForeignKey(d => d.ProductVariationId);
        });

        modelBuilder.Entity<ProductVariation>(entity =>
        {
            entity.HasIndex(e => e.ProductId, "IX_ProductVariations_ProductId");

            entity.Property(e => e.Discount).HasDefaultValueSql("(CONVERT([smallint],(0)))");
            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasDefaultValueSql("(CONVERT([bit],(0)))");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductVariations).HasForeignKey(d => d.ProductId);
        });

        modelBuilder.Entity<ShoppingCart>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.User).WithOne(p => p.ShoppingCart)
                .HasForeignKey<ShoppingCart>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<ShoppingCartItem>(entity =>
        {
            entity.HasKey(e => e.ProductVariationId);

            entity.HasIndex(e => e.ShoppingCartId, "IX_ShoppingCartItems_ShoppingCartId");

            entity.Property(e => e.ProductVariationId).ValueGeneratedNever();
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.ProductVariation).WithOne(p => p.ShoppingCartItem)
                .HasForeignKey<ShoppingCartItem>(d => d.ProductVariationId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.ShoppingCart).WithMany(p => p.ShoppingCartItems)
                .HasForeignKey(d => d.ShoppingCartId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}