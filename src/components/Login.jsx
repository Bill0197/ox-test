import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const history = useHistory();
  const { REACT_APP_BASE_URL } = process.env;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      fetch(`${REACT_APP_BASE_URL}/security/auth_check`, {
        body: `_username=${email}&_password=${password}&_subdomain=toko`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('token', `Bearer ${res.token}`);
        })
        .then(() => {
          setLoading(false);
          history.push('/home');
        });
    } catch (_) {
      console.error(_.message, 'errorr');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(3, 'Password should be of minimum 3 characters length')
            .required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Title level={2}>LOG IN</Title>

            <Input
              size='large'
              id='email'
              type='text'
              placeholder='Email'
              {...formik.getFieldProps('email')}
            />
            <ErrorMessage name='email'>
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
            <Input
              size='large'
              id='password'
              type='password'
              placeholder='Password'
              {...formik.getFieldProps('password')}
            />
            <ErrorMessage name='password'>
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>

            <Button
              htmlType='submit'
              loading={loading}
              type='primary'
              size='large'
              block
            >
              LOG IN
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

export const Form = styled.form`
  background: white;
  width: 30%;
  min-width: 300px;
  padding: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding-top: 20vh;
`;
