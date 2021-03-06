import {
  ContactsOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export const ROUTES = [
  {
    route: 'Role',
    icon: ContactsOutlined,
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
  {
    route: 'User',
    icon: UserAddOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'User list',
        path: '/user/list',
      },
      {
        httpRequest: 'POST',
        title: 'User create',
        path: '/user/create',
      },
    ],
  },
  {
    route: 'Staff',
    icon: UsergroupAddOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'Staff list',
        path: '/staff/list',
      },
      {
        httpRequest: 'POST',
        title: 'Staff create',
        path: '/staff/create',
      },
    ],
  },
  {
    route: 'Invoice',
    icon: FileOutlined,
    methods: [
      {
        httpRequest: 'GET',
        title: 'Invoice list',
        path: '/invoice/list',
      },
    ],
  },
  {
    route: 'Category',

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
    route: 'Product',
    icon: ShoppingCartOutlined,
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
];
