namespace backend.Features.Campaign.Models;

[GenerateSerializer]
public class PromotionManagerState
{
    [Id(0)] public HashSet<string> Promotions { get; set; } = new();
}