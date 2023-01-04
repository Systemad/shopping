import * as icons from "@tabler/icons";
import { GetDynamicIconAsString } from "../Helpers/GetDynamicIconName";

interface Props {
  iconName: string;
  //color?: string;
  size?: number;
  //stroke?: number;
}

export const DynamicTablerIcons = (props: Props): JSX.Element => {
  const { iconName, size } = props;

  let iconString = GetDynamicIconAsString(iconName);
  // @ts-ignore
  const Icon: JSX.Element = icons[iconString];

  return (
    // @ts-ignore
    <Icon size={size} />
  );
};
