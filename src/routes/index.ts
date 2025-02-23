import { AppRoutes } from '@/constants/routes';

interface Props {
  id: string | number;
  label: string;
  path: string;
  icon?: string;
}

const profile = AppRoutes.PERSONAL_ACCOUNT;

export const navLinks: Props[] = [
  {
    id: 1,
    label: 'About us',
    path: '/about',
  },
  {
    id: 2,
    label: 'Blog',
    path: '/blog',
  },
  {
    id: 3,
    label: 'Contacts',
    path: '/contacts',
  },
];

export const profileLinks: Props[] = [
  {
    id: 1,
    label: 'orders',
    path: `${profile}/orders`,
    icon: '/icons/Orders.svg',
  },
  {
    id: 2,
    label: 'edit',
    path: `${profile}/edit_data`,
    icon: '/icons/EditData.svg',
  },
  {
    id: 3,
    label: 'favorites',
    path: `${profile}/favorites`,
    icon: '/icons/FavoritesBlack.svg',
  },
  {
    id: 4,
    label: 'exit',
    path: `${profile}/exit`,
    icon: '/icons/Orders.svg',
  },
];
