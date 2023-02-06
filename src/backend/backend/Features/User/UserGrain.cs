using backend.Features.User.Models;
using backend.Features.Wishlist;
using Orleans.Runtime;

namespace backend.Features.User;

public class UserGrain : Grain, IUserGrain
{
    private readonly IPersistentState<UserState> _state;
    public UserGrain([PersistentState("User", "userStore")] IPersistentState<UserState> state)
    {
        _state = state;
    }
    
    public async Task SetUserInfo(string username, string email)
    {
        _state.State.UserId = this.GetPrimaryKeyString();
        _state.State.Email = email;
        _state.State.Username = username;
        await _state.WriteStateAsync();
    }

    public async Task<WishlistDto> GetWishlist()
    {
        var wishlistGrain = GrainFactory.GetGrain<IWishlistGrain>(_state.State.WishlistId);
        var wishlist = await wishlistGrain.GetWishlist();
        var wishlistObject = new WishlistDto
        {
            OwnerId = _state.State.UserId,
            Owner = _state.State.Username,
            WishlistId = _state.State.WishlistId,
            Name = wishlist.Name,
            IsPublic = wishlist.IsPublic,
            Products = wishlist.products
        };
        return wishlistObject;
    }

    public Task<string> GetShoppingCartId() => Task.FromResult(_state.State.ShoppingCartId);
    public Task<string> GetWishlistId() => Task.FromResult(_state.State.WishlistId);
}