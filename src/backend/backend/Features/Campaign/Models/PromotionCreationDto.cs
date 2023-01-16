namespace backend.Features.Campaign.Models;

[GenerateSerializer]
public class PromotionCreationDto
{
    [Id(0)]
    public string Name { get; set; }
    [Id(1)]
    public string? Description { get; set; }
    [Id(2)]
    public string? BannerImg { get; set; }
    [Id(3)]
    public bool Active { get; set; }
}