namespace backend.Features.Promotion.Models;

[GenerateSerializer]
public class PromotionState
{
    [Id(0)]
    public string Id { get; set; }
    [Id(1)]
    public string Name { get; set; }
    [Id(2)]
    public string? Description { get; set; }

    [Id(3)] public HashSet<string> ProductIds { get; set; } = new();
    [Id(4)]
    public string? BannerImg { get; set; }

    [Id(5)]
    public bool Active { get; set; }
}