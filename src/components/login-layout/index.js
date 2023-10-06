import React from 'react';
import { Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BigLogo from '../../assets/new/common/logo.svg';
import ArrowLeft from '../../assets/new/login/arrow-left.svg';
import Dots1 from '../../assets/new/login/dots-1.svg';
import Dots2 from '../../assets/new/login/dots-2.svg';
import PAGES from '../../routes/constants';

import './styles.scss';

const LoginLayout = ({ children }) => {
  return (
    <div className='login-layout'>
      <Row type='flex' justify="center" align="middle" style={{minHeight: '100vh'}} >
        {/* <Col
          lg={14}
          md={0}
          sm={0}
          xs={0}
          className='login-banner'
        >
        </Col> */}
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24} className='login-form-col'
        >
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24} className='login-form-col'
        >
          {children}
        </Col>
      </Row>
    </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.element,
};

export default LoginLayout;
