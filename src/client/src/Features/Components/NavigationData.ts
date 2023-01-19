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
const baseCategory = "categories";
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
    label: "Hardware",
    href: `${baseCategory}/hardware`,
  },
  {
    label: "Software",
    href: `${baseCategory}/software`,
  },
  {
    label: "All Categories",
    href: "categories",
  },
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
];
