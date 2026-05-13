import type { LucideIcon } from "@lucide/vue";
import { Users, History, MessageCircle, ShoppingBag, Video, Newspaper, Star, LayoutDashboard } from "lucide-vue-next";

export const groups: Listed<AdminSidebarGroupProps> = [
  {
    items: [
      {
        icon: LayoutDashboard,
        label: "admin.navigation.dashboard",
        to: "/admin",
        exact: true,
      },
    ],
  },
  {
    label: "admin.navigation.portfolio.label",
    items: [
      /* {
        icon: Video,
        label: "Galerie vidéo",
        to: "/admin/video-gallery",
      }, */
      {
        icon: Newspaper,
        label: "admin.navigation.portfolio.blog",
        to: "/admin/blog",
      },
      {
        icon: Star,
        label: "admin.navigation.portfolio.testimonials",
        to: "/admin/testimonials",
      },
    ],
  },
  /* {
    label: "Boutique",
    items: [
      {
        icon: ShoppingBag,
        label: "Packs",
        to: "/admin/packs",
      },
    ],
  }, */
  {
    label: "admin.navigation.contact.label",
    items: [
      {
        icon: MessageCircle,
        label: "admin.navigation.contact.messages",
        to: "/admin/web-contact",
      },
    ],
  },
  {
    label: "admin.navigation.admin.label",
    items: [
      /* {
        icon: Users,
        label: "admin.navigation.admin.users",
        to: "/admin/users",
      }, */
      /* {
        icon: Users,
        label: "admin.navigation.admin.customers",
        to: "/admin/customers",
      }, */
      {
        icon: History,
        label: "admin.navigation.admin.audit-trail",
        to: "/admin/audit-trail",
      },
    ],
  },
];

export interface AdminSidebarButtonProps {
  icon: LucideIcon;
  label: string;
  to: string;
  exact?: boolean;
}

export interface AdminSidebarGroupProps {
  label?: string;
  items: Listed<{
    icon: LucideIcon;
    label: string;
    to: string;
    exact?: boolean;
  }>;
}
