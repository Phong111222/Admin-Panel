import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetListCategories } from '../../../store/category/actions';
import { GetListProducts } from '../../../store/product/actions';
import { GetRoleList } from '../../../store/role/actions';
import { GetStaffList } from '../../../store/staff/actions';
import { GetUserList } from '../../../store/user/actions';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Row, Col, Typography, Card, Select } from 'antd';
import {
  getDataAnalytic,
  getRevenueByYear,
  resetRevenue,
} from '../../../store/analytics/actions';
import { RootState } from '../../../store/RootReducer';
import { AnalyticState } from '../../../store/analytics/types';
import { getListInvoice } from '../../../store/invoice/actions';
import { useMemo } from 'react';
import { useState } from 'react';
import Loading from '../../common/loading';

const years = [2021, 2022, 2023, 2024];

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide

  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
const Home: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getListInvoice());
    dispatch(GetListCategories());
    dispatch(GetListProducts());
    dispatch(GetRoleList());
    dispatch(GetUserList());
    dispatch(GetStaffList());
    dispatch(getDataAnalytic());
    dispatch(resetRevenue());
    setLoading(false);
  }, [dispatch]);

  const { total, listRankedProduct, listRankedStaff, monthRevenue } =
    useSelector<RootState, AnalyticState>((state) => state.analytic);
  const handleGetRevenueByYear = (year: number) => {
    dispatch(getRevenueByYear(year));
  };
  const listTop5RankedStaff = useMemo(() => {
    const newList: typeof listRankedStaff = [];
    for (let i = 0; i < 5; i++) {
      newList.push(listRankedStaff[i]);
    }
    return newList;
    // eslint-disable-next-line
  }, [loading]);
  if (loading) return <Loading />;
  return (
    <>
      <Row>
        {total !== null &&
          Object.keys(total).map((key: string) => {
            const data = {
              labels: ['Active', 'InActice'],

              datasets: [
                {
                  data: [total[key].active, total[key].inActive],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            };
            return (
              <Col
                key={key}
                span={6}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Card
                  bodyStyle={{
                    padding: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  style={{
                    width: '90%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    boxShadow:
                      '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                  }}>
                  <Typography.Title
                    level={3}
                    style={{
                      fontSize: 20,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}>
                    {key}
                  </Typography.Title>
                  <div
                    style={{ width: '100%', height: '100%', margin: '0 auto' }}>
                    <Doughnut
                      data={data}
                      type='pie'
                      style={{
                        width: '80%',
                        height: '85%',
                        margin: '0 auto',
                        marginBottom: 10,
                      }}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        <Col span={24} style={{ marginTop: 30 }}>
          <Row>
            <Col span={11}>
              <Typography.Title level={4} style={{ textAlign: 'center' }}>
                LIST RANKED STAFFS
              </Typography.Title>
              {(() => {
                const data = {
                  labels: listTop5RankedStaff.map(
                    (staff) => `${staff?.firstname} ${staff?.lastname}`
                  ),
                  datasets: [
                    {
                      data: listTop5RankedStaff.map(
                        (staff) => staff?.revenueMake
                      ),
                      backgroundColor: ['#3781cc'],
                    },
                  ],
                };
                return <Bar data={data} options={options} type='bar' />;
              })()}
            </Col>
            <Col offset={2} span={11}>
              <Typography.Title level={4} style={{ textAlign: 'center' }}>
                LIST RANKED PRODUCTS
              </Typography.Title>
              {(() => {
                const data = {
                  labels: listRankedProduct.map((product) => `${product.name}`),
                  datasets: [
                    {
                      data: listRankedProduct.map((product) => product.value),
                      backgroundColor: ['#3781cc'],
                    },
                  ],
                };
                return <Bar data={data} options={options} type='bar' />;
              })()}
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 30 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Revenue by year
            </Typography.Title>
            <Select
              placeholder='Select year'
              style={{ width: 100 }}
              showArrow={false}
              onSelect={handleGetRevenueByYear}>
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            {(() => {
              const data = {
                labels: Object.keys(monthRevenue),
                datasets: [
                  {
                    data: Object.keys(monthRevenue).map(
                      (key) => monthRevenue[key]
                    ),
                    fill: false,
                    backgroundColor: '#3781cc',
                    borderColor: '#3781cc',
                  },
                ],
              };

              const options = {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              };
              return (
                <Line
                  height={100}
                  type='line'
                  options={options}
                  data={data}
                  style={{ marginTop: 30 }}></Line>
              );
            })()}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
