type IconMapType = { [name: string]: string };

const iconMap: IconMapType = {
  ["Accessories"]: "IconDeviceGamepad2",
  ["Hardware"]: "IconCpu",
  ["Software"]: "IconHanger",
  ["Books"]: "IconBooks",
  ["Movies"]: "IconMovie",
  ["Music"]: "IconMusic",
  //["Clothes"]: "IconHanger",
  ["Games"]: "IconHanger",
  ["Other"]: "IconDots",
};

export const GetDynamicIconAsString = (iconKey: string): string => {
  const tablerIconString = iconMap[iconKey];
  return tablerIconString;
};
