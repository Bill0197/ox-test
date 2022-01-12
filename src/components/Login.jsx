import React, { useContext, useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Skeleton, Button, Input } from 'antd';

const Login = (props) => {
  const history = useHistory();
  const { REACT_APP_BASE_URL } = process.env;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    token.token &&
      history.push(
        props?.location?.state?.from ? props.location.state.from : '/home'
      );
  }, [token.token]);

  const handleSubmit = async ({ email, password }) => {
    setLoad(true);
    try {
      data.meta.token &&
        (await fetch(
          `${REACT_APP_BASE_URL}/security/auth_check&'_username=${email}&_password=${password}&_subdomain=toko`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${data.token}` },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem('token', `Bearer ${res.token}`);
          })
          .then(() => console.log('logged in')));
      setLoading(false);
    } catch (_) {
      console.error(_.message);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(3, 'Password should be of minimum 3 characters length')
            .required('Required'),
          email: Yup.string().email('Enter a valid email').required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              {...formik.getFieldProps('email')}
            />
            <ErrorMessage name='email'>
              {(msg) => <Message>{msg}</Message>}
            </ErrorMessage>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              {...formik.getFieldProps('password')}
            />
            <ErrorMessage name='password'>
              {(msg) => <Message>{msg}</Message>}
            </ErrorMessage>

            <Button type='primary'>
              {loading ? (
                <Skeleton loading={true} size='large' />
              ) : (
                <div>LOG IN</div>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
