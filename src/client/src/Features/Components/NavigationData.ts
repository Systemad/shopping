export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const baseCategory = "category";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "categories",
    children: [
      {
        label: "Hardware",
        href: `${baseCategory}/hardware`,
      },
      {
        label: "Software",
        href: `${baseCategory}/software`,
      },
      {
        label: "Accessories",
        href: `${baseCategory}/accessories`,
      },
      {
        label: "Promotions",
        href: `${baseCategory}/promotions`,
      },
    ],
  },
];
