import { RootBottomParamList } from ".";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootBottomParamList {}
  }
}
