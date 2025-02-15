import { JSX } from "react";

export interface Notification {
    id: number;
    title: string;
    message: string;
    created_at: string;
    is_read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
  }
  type NavLink = {
    href?: string;
    label: string;
    icon?: JSX.Element;
    items?: { href: string; label: string; icon: JSX.Element }[];
  };