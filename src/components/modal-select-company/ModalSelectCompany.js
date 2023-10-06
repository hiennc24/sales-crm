import React, { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './ModalSelectCompany.scss';
import Logo from '../../assets/new/common/logo.svg';
import Building from '../../assets/images/building.svg';
import AddBuilding from '../../assets/images/add_building.svg';
import Logout from '../../assets/new/header/logout.svg';
import { selectToken } from '../../stores/global/global.selector';
import { logout } from '../../stores/global/global.action';
import { saveCompany } from '../../pages/user-profile/UserProfile.action'
import { getListCompany } from '../../pages/home/Home.action';
import BoxLoading from '../box-loading/BoxLoading';
import ModalCreateCompany from '../modal-create-company/ModalCreateCompany';
import { useCookies } from 'react-cookie';
import {
  selectListCompany,
  selectLoading,
} from '../../pages/home/Home.selector';
import API from '../../services/api';
import toaster from '../../components/toaster';
import PAGES from '../../routes/constants';

const FIXED_DOMAIN = process.env.REACT_APP_FIXED_DOMAIN;

const ModalSelectCompany = ({ isShow, onToggle }) => {
  const dispatch = useDispatch();
  const [isShowCreateCompanyModal, setShowCreateCompany] = useState(false);
  const token = useSelector(selectToken());
  const companies = useSelector(selectListCompany());
  const isLoading = useSelector(selectLoading());
  const history = useHistory();
  
  const [cookies, setCookie, removeCookie] = useCookies(['company']);

  useEffect(() => {
    const getAllCompany = () => {
      if (token && isShow) {
        dispatch(getListCompany());
      }
    };
    getAllCompany();
  }, [token, isShow, dispatch]);

  const handleToggleCreateCompany = () => {
    setShowCreateCompany(!isShowCreateCompanyModal);
  };
  // console.log('ccccc');
  const handleSelectCompany = (company) => {
    setCookie('company', company)
    API.company
      .loginCompany({
        CompanyId: company.Id,
      })
      .then((result) => {
        window.location = `https://${company.Slugname}.${FIXED_DOMAIN}${PAGES.splash}?access_token=${result?.data?.token}`;
        // console.log('token ne 1', result?.data)
        localStorage.setItem('token', result?.data?.token)
      })
      .catch((e) => {
        toaster.error(e);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(PAGES.login);
  };

  return (
    <div>
      <Modal
        width={'60%'}
        centered
        visible={isShow}
        footer={null}
        wrapClassName='modal-select-company'
        onCancel={onToggle}
      >
        <div className='modal-select-company-wrapper'>
          <div className='modal-header'>
            <h3 className='title'>
              <img src={Logo} alt='logo' />
              {/* <span>của bạn</span> */}
            </h3>
            <p className='desc'>Tài khoản ABIZIN của bạn.</p>
          </div>
          <div className='modal-body'>
            {isLoading ? (
              <div className='loading'>
                <BoxLoading />
              </div>
            ) : (
              <Row gutter={[10, 10]}>
                {companies.map((company) => {
                  return (
                    <Col
                      span={8}
                      key={company.Id}
                      onClick={() => handleSelectCompany(company)}
                    >
                      <div className='your-company'>
                        <div className='your-company-inner'>
                          <img src={Building} alt={company.Fullname} />
                          <p>{company.Fullname}</p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
                <Col span={8}>
                  <div
                    className='create-company'
                    onClick={handleToggleCreateCompany}
                  >
                    <div className='create-company-inner'>
                      <img src={AddBuilding} alt='company' />
                      <p style={{ color: 'black' }}>Tạo công ty mới</p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </div>
          <div className='modal-footer'>
            <div className='btn-logout' onClick={handleLogout}>
              <div className="logoutIconCustom">
                <img src={Logout} alt='logout' />
              </div>
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </Modal>
      <ModalCreateCompany
        isShow={isShowCreateCompanyModal}
        setIsShow={setShowCreateCompany}
        onToggle={handleToggleCreateCompany}
      />
    </div>
  );
};

ModalSelectCompany.propTypes = {
  isShow: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default ModalSelectCompany;
