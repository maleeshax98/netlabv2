export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Deals",
    href: "/deals",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const productCategories: NavItem[] = [
  {
    title: "Microcontrollers",
    href: "/categories/microcontrollers",
    description: "Arduino, ESP32, STM32, and more for your smart projects.",
  },
  {
    title: "Sensors",
    href: "/categories/sensors",
    description: "Temperature, motion, gas, and distance sensors.",
  },
  {
    title: "Passive Components",
    href: "/categories/passives",
    description: "Resistors, capacitors, and inductors in all values.",
  },
  {
    title: "Power Supply",
    href: "/categories/power",
    description: "Batteries, chargers, and voltage regulators.",
  },
  {
    title: "Connectors",
    href: "/categories/connectors",
    description: "Headers, cables, and terminal blocks.",
  },
  {
    title: "Tools & Equipment",
    href: "/categories/tools",
    description: "Soldering irons, multimeters, and breadboards.",
  },
];
