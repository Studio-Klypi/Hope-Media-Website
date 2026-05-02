interface Link {
  label: string;
  to: string;
}

export const links: Link[] = [
  {
    label: "gallery",
    to: "/gallery",
  },
  {
    label: "blog",
    to: "/blog",
  },
  {
    label: "book",
    to: "/book",
  },
  {
    label: "contact",
    to: "/contact",
  },
] as const;
