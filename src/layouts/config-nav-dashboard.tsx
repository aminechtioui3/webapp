import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Notifications',
    path:'/Notifications',
    icon: icon('ic-notification'),
  },
  {
    title: 'Members',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Membership ',
    path: '/membership',
    icon: icon('ic-cart'),
    info: (
        <Label color="error" variant="inverted">
          new
        </Label>
    ),
  },
  {
    title: 'Expense ',
    path: '/expense',
    icon: icon('ic-cart'),
    info: (
        <Label color="error" variant="inverted">
          5
        </Label>
    ),
  },

  {
    title: 'Shop',
    path: '/shop',
    icon: icon('ic-cart'),
    info: (
        <Label color="error" variant="inverted">
          new
        </Label>
    ),
  },
  {
    title: 'Product Category',
    path: '/product-category',
    icon: icon('ic-cart'),

  },
  {
    title: 'Product Orders',
    path: '/product-orders',
    icon: icon('ic-cart'),

  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
        <Label color="error" variant="inverted">
          +3
        </Label>
    ),
  },


  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Article',
    path: '/article',
    icon: icon('ic-cart'),
  },
  {
    title: 'Deals',
    path: '/deals',
    icon: icon('ic-cart'),

  },
  {
    title: 'History',
    path: '/history',
    icon: icon('ic-cart'),
    info: (
        <Label color="error" variant="inverted">
          +11
        </Label>
    ),
  },
  {
    title: 'Sessions',
    path: '/session',
    icon: icon('ic-cart'),
  },
  {
    title: 'Exercises',
    path: '/exercises',
    icon: icon('ic-cart'),
  },

  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
