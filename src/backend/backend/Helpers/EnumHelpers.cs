using backend.Features.Product.Models;

namespace backend.Helpers;

public static class EnumHelpers
{
    public static List<string> GetEnumsAsList()
    {
        var categories = Enum.GetNames(typeof(ProductCategory)).ToList(); // .GetValues<ProductCategory>().ToList();
        return categories;
    }
}