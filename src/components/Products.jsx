import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Space, Pagination, Table, Skeleton } from 'antd';
import { getCurrentUser } from '../http';
import { Redirect, useHistory } from 'react-router-dom';

export default function Products() {
  const { REACT_APP_BASE_URL } = process.env;
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getProducts = async () => {
    setLoading(true);
    let res;

    try {
      res = await axios.get(
        `${REACT_APP_BASE_URL}/variations?page=${page}&size=${size}`
      );

      setProducts(res?.data?.items);
      setTotal(res?.data?.total_count);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, size]);

  const onShowSizeChange = (current, size) => {
    setSize(size);
  };

  const handlePaginationChange = (n) => {
    setPage((page) => page + n);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'id',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'id',
    },
    {
      title: ' Bar code',
      dataIndex: 'barcode',
      key: 'id',
    },
    {
      title: 'Short Description',
      dataIndex: 'shortDescription',
      key: 'id',
    },
  ];

  const user = getCurrentUser();

  if (!user) {
    history.push('/login');
  }

  return (
    <div>
      <Navbar />

      <div
        style={{
          margin: '10vh auto',
          width: '80vw',
          margin: 'auto',
          padding: '30px',
        }}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <Table pagination={false} dataSource={products} columns={columns} />
          </>
        )}

        <Space>
          <Pagination
            defaultCurrent={page + 1}
            current={page + 1}
            total={total}
            defaultPageSize={size}
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            pageSizeOptions={['5', '10', '20', '50', '100']}
            pageSize={size}
            onChange={handlePaginationChange}
          />
        </Space>
      </div>
    </div>
  );
}
