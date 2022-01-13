import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Space, Pagination, Table, Skeleton } from 'antd';
import { getCurrentUser } from '../http';
import { useHistory } from 'react-router-dom';
import { Input, message, Typography } from 'antd';
const { Title } = Typography;
const { Search } = Input;

export default function ProductsList() {
  const { REACT_APP_BASE_URL } = process.env;
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [showSorted, setShowSorted] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
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
      message.error(err?.message);
      setLoading(false);
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
    history.push('/sign-in');
  }

  const onChange = ({ target: { value } }) => {
    if (value === '') {
      setShowSorted(false);
      return setProducts(products);
    }
  };

  const onSearch = (value) => {
    const res = products?.filter((p) =>
      p?.name?.includes(value?.toUpperCase())
    );

    res?.sort(function (a, b) {
      var textA = a.name?.toUpperCase();
      var textB = b.name?.toUpperCase();

      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    setShowSorted(true);
    setSortedProducts(res);
  };

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
        <Search
          placeholder='Search by product name...'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={onSearch}
          onChange={onChange}
        />

        {!loading && <Title level={2}>Total: {total}</Title>}

        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <Table
              rowKey='id'
              pagination={false}
              dataSource={showSorted ? sortedProducts : products}
              columns={columns}
            />
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
