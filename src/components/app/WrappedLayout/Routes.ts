import { CarOutlined, TagOutlined, UserAddOutlined } from '@ant-design/icons';

export const ROUTES = [
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
    route: 'role',
    icon: UserAddOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'Role list',
        path: '/role/list',
      },
      {
        httpRequest: 'POST',
        title: 'Role create',
        path: '/role/create',
      },
    ],
  },
];
