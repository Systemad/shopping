/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as icons from "@tabler/icons-react";
import { GetDynamicIconAsString } from "../Helpers/GetDynamicIconName";

interface Props {
  iconName: string;
  //color?: string;
  size?: number;
  //stroke?: number;
}

export const DynamicTablerIcons = (props: Props): JSX.Element => {
  const { iconName, size } = props;

  const iconString = GetDynamicIconAsString(iconName);
  // @ts-ignore
  const Icon: JSX.Element = icons[iconString];

  return (
    // @ts-ignore
    <Icon size={size} />
  );
};
