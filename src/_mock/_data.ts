import {
  _id,
  _price,
  _times,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'ADMIN',
  email: 'aminechtioui386@gmail.com',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  isVerified: "expDate",
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'paid' : 'expired',
  role:
    [
      'Free access',
      'Specific course',
      'Boxing course',
      'Kids course',
      'Private coaching',
      'Circuit Course',
      'Football Courses',
      'Handball courses',
      '100% women',
      'Crossfit courses',
    ][index] || 'Free access',
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? null : _price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    'ali paid 60TND',

    'makrem paid 60TND',

    'mohamed 700TND',

    'Iheb paid 1TND'
   
  ][index],
  type: `order2`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _tasks = [...Array(5)].map((_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'You have a new feedback',
    description: 'X wrote a feedback today',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered just ordered ISO whey ',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from X',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];
