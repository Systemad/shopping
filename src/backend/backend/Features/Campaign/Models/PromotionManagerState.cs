namespace backend.Features.Campaign.Models;

[GenerateSerializer]
public class PromotionManagerState
{
    [Id(0)]
    public HashSet<string> ActivePromotions { get; set; }
    [Id(1)]
    public HashSet<string> NonActivePromotions { get; set; }
}