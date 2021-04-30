import { CarOutlined, TagOutlined } from '@ant-design/icons';

export const ROUTES = [
  {
    route: 'product',
    icon: CarOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'Products list',
        path: '/product/list',
      },
      {
        httpRequest: 'POST',
        title: 'Create product',
        path: '/product/create',
      },
    ],
  },
  {
    route: 'category',
    icon: TagOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'Category list',
        path: '/category/list',
      },
      {
        httpRequest: 'POST',
        title: 'Create category',
        path: '/category/create',
      },
    ],
  },
];
