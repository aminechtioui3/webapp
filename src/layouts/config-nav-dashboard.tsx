import { Label } from 'src/components/label';
import {
  Dashboard,
  Notifications,
  People,
  ShoppingCart,
  Category,
  ListAlt,
  ShoppingBag,
  Article,
  History,
  FitnessCenter,
  Lock,
  ErrorOutline, Home, HomeMini,
} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <Notifications />,
    info: <Label color="error" variant="inverted">new</Label>,
  },
  {
    title: 'Members',
    path: '/user',
    icon: <People />,
  },
  {
    title: 'Membership',
    path: '/membership',
    icon: <ShoppingCart />,
    info: <Label color="error" variant="inverted">new</Label>,
  },
  {
    title: 'Expense',
    path: '/expense',
    icon: <ShoppingCart />,
    info: <Label color="error" variant="inverted">5</Label>,
  },
  {
    title: 'Shop',
    path: '/shop',
    icon: <ShoppingBag />,
    info: <Label color="error" variant="inverted">new</Label>,
  },
  {
    title: 'Product Category',
    path: '/product-category',
    icon: <Category />,
  },
  {
    title: 'Product Orders',
    path: '/product-orders',
    icon: <ListAlt />,
  },
  {
    title: 'Product',
    path: '/products',
    icon: <ShoppingBag />,
    info: <Label color="error" variant="inverted">+3</Label>,
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: <Article />,
  },
  {
    title: 'Article',
    path: '/article',
    icon: <Article />,
  },
  {
    title: 'Deals',
    path: '/deals',
    icon: <ShoppingCart />,
  },
  {
    title: 'History',
    path: '/history',
    icon: <History />,
    info: <Label color="error" variant="inverted">+11</Label>,
  },
  {
    title: 'Sessions',
    path: '/session',
    icon: <ListAlt />,
  },
  {
    title: 'Exercises',
    path: '/exercises',
    icon: <FitnessCenter />,
  },
  {
    title: 'Facilities',
    path: '/facilities',
    icon: <HomeMini />,
  },
  
];
