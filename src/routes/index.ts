import { AppRoutes } from '@/constants/routes';

interface Props {
  id: string | number;
  label: string;
  path: string;
  icon: string;
}

const profile = AppRoutes.PERSONAL_ACCOUNT;

export const navLinks: Props[] = [
  {
    id: 1,
    label: 'About us',
    path: '/about',
    icon: '',
  },
  {
    id: 2,
    label: 'Blog',
    path: '/blog',
    icon: '',
  },
  {
    id: 3,
    label: 'Contacts',
    path: '/contacts',
    icon: '',
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
    icon: '/icons/SignOut.svg',
  },
];

export const footerInformationLinks: Props[] = [
  {
    id: 1,
    label: 'about',
    path: '/about',
    icon: '',
  },
  {
    id: 2,
    label: 'promotions',
    path: '',
    icon: '',
  },
  {
    id: 3,
    label: 'blog',
    path: '/blog',
    icon: '',
  },
  {
    id: 4,
    label: 'manufacturers',
    path: '',
    icon: '',
  },
  {
    id: 5,
    label: 'term',
    path: '',
    icon: '',
  },
];

export const footerSupportLinks: Props[] = [
  {
    id: 1,
    label: 'guarantee',
    path: '',
    icon: '',
  },
  {
    id: 2,
    label: 'delivery',
    path: '',
    icon: '',
  },
  {
    id: 3,
    label: 'payment',
    path: '',
    icon: '',
  },
  {
    id: 4,
    label: 'return',
    path: '',
    icon: '',
  },
];
