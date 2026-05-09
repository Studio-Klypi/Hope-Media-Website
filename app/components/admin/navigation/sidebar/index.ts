import type { LucideIcon } from "@lucide/vue";
import { Users, ShoppingBag, Video, Newspaper, Star, LayoutDashboard } from "lucide-vue-next";

export const groups: Listed<AdminSidebarGroupProps> = [
  {
    items: [
      {
        icon: LayoutDashboard,
        label: "admin.navigation.dashboard",
        to: "/admin",
      },
    ],
  },
  /* {
    label: "Portfolio",
    items: [
      {
        icon: Video,
        label: "Galerie vidéo",
        to: "/admin/video-gallery",
      },
      {
        icon: Newspaper,
        label: "Blog",
        to: "/admin/blog",
      },
      {
        icon: Star,
        label: "Témoignages",
        to: "/admin/testimonials",
      },
    ],
  },
  {
    label: "Boutique",
    items: [
      {
        icon: ShoppingBag,
        label: "Packs",
        to: "/admin/packs",
      },
    ],
  },
  {
    label: "Gestion",
    items: [
      {
        icon: Users,
        label: "Clients",
        to: "/admin/clients",
      },
    ],
  }, */
];

export interface AdminSidebarButtonProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export interface AdminSidebarGroupProps {
  label?: string;
  items: Listed<{
    icon: LucideIcon;
    label: string;
    to: string;
  }>;
}
