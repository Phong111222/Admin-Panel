import { FC } from 'react';
import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { RoleState, RoleType } from '../../../store/role/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { ToggleRole } from '../../../store/role/actions';
import AxiosConfig from '../../../config/axiosConfig';
import { Role } from '../../../utils/contanst';
import { useMemo } from 'react';
const RoleList: FC = () => {
  const dispatch = useDispatch();
  const { list } = useSelector<RootState, RoleState>((state) => state.role);
  const handleToggle = async (id: string) => {
    dispatch(ToggleRole(id));
    const token =
      (typeof window !== 'undefined' && window.localStorage.getItem('token')) ||
      null;
    await AxiosConfig.patch(Role.TOGGLE_AND_GET_BY_ID(id), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const Columns: ColumnsType<RoleType> = [
    {
      title: <p style={{ textAlign: 'center', marginBottom: 0 }}>Name</p>,
      dataIndex: 'name',
      render: (name) => (
        <p style={{ textAlign: 'center', marginBottom: 0 }}>{name}</p>
      ),
      key: 'name',
    },
    {
      title: (
        <p style={{ textAlign: 'center', marginBottom: 0 }}>Permissions</p>
      ),
      dataIndex: 'permissions',
      render: (permissions: string[]) => (
        <>
          {permissions.map((permission, index) => (
            <Tag key={index}>{permission}</Tag>
          ))}
        </>
      ),
      key: 'permissions',
    },
    {
      title: <p style={{ textAlign: 'center', marginBottom: 0 }}>Methods</p>,
      dataIndex: 'methods',
      render: (methods: string[]) => (
        <>
          {methods.map((method, index) => (
            <Tag key={index}>{method}</Tag>
          ))}
        </>
      ),
      key: 'methods',
    },
    {
      title: <p style={{ textAlign: 'center', marginBottom: 0 }}>Active</p>,
      render: (_, { _id, isActive }) => (
        <div>
          <Button
            onClick={() => handleToggle(_id)}
            style={{ display: 'block', margin: '0 auto' }}
            type='primary'
            danger={!isActive}>
            {isActive ? 'Active' : 'InActive'}
          </Button>
        </div>
      ),
      key: 'active',
    },
  ];
  const newList = useMemo(() => {
    return list.map((role, index: number) => ({ ...role, key: index }));
    // eslint-disable-next-line
  }, [handleToggle]);
  return (
    <>
      <Table<RoleType>
        onRow={() => ({
          style: { cursor: 'pointer' },
        })}
        columns={Columns}
        dataSource={newList}
        pagination={{ pageSize: 7 }}
        bordered
      />
    </>
  );
};

export default RoleList;
