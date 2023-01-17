using backend.Features.Product.Models;

namespace backend.Helpers;

public static class Filtering
{
    public static IEnumerable<ProductDetail> ProductFiltering(this IEnumerable<ProductDetail> collection, string sortOrder)
    {
        collection = sortOrder switch
        {
            "name_desc" => collection.OrderByDescending(s => s.Name),
            "Date" => collection.OrderBy(s => s.CreatedAt),
            "date_desc" => collection.OrderByDescending(s => s.CreatedAt),
            "Price" => collection.OrderBy(s => s.Price),
            "price_desc" => collection.OrderByDescending(s => s.Price),
            "Quantity" => collection.OrderBy(s => s.Quantity),
            "quantity_desc" => collection.OrderByDescending(s => s.Quantity),
            _ => collection.OrderByDescending(s => s.Name)
        };
        return collection;
    }
}