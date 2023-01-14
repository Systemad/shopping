namespace backend.Features.Campaign.Models;

public class PromotionCreationDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string BannerImg { get; set; }
    public bool Active { get; set; }
}