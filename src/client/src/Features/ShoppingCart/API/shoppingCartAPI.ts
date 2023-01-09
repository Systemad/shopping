import { emptySplitApi as api } from "../../../redux/emptySplitApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: false,
});
export { injectedRtkApi as shoppingCartSplitApi };
export const {} = injectedRtkApi;
