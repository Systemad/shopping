export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

interface HeaderLink {
  link: string;
  label: string;
}
const baseCategory = "category";
const Links: HeaderLink[] = [
  { link: "/", label: "Home" },
  { link: `${baseCategory}/hardware`, label: "Hardware" },
  { link: `${baseCategory}/software`, label: "Software" },
  { link: `${baseCategory}/accessories`, label: "Accessories" },
  { link: `${baseCategory}/books`, label: "Books" },
  { link: "categories", label: "All Categories" },
];

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "categories",
  },
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
];
