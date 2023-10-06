import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Divider, Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import LoginLayout from '../../components/login-layout';

import BigLogo from '../../assets/new/login/Logo_Biso.png';
import Facebook from '../../assets/new/login/facebook.svg';
import Google from '../../assets/new/login/google.svg';
import { validateEmail } from '../../utils';

import PAGES from '../../routes/constants';
import { FB_APP_ID, GG_CLIENT_ID } from '../../constants/config';
import {
  loginSocial,
  resetError,
  login,
} from '../../stores/global/global.action';
import {
  selectToken,
  selectError,
  selectLoadingFacebook,
  selectLoadingGoogle,
  selectLoading,
} from '../../stores/global/global.selector';
import toaster from '../../components/toaster';
import BoxLoading from '../../components/box-loading/BoxLoading';
import {
  isTokenExpired,
  clearToken,
} from '../../services/storages/userStorage';
import lang from '../../lang';
import logo from '../../assets/images/logoLogin.svg';
import logoGG from '../../assets/images/LogoGG.svg';
import logoFB from '../../assets/images/Facebook.png';
import logoZalo from '../../assets/new/login/zalo-logo.png';
import line from '../../assets/images/line.png';
import './Login.scss';
import { Switch } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken());
  const isLoadingFB = useSelector(selectLoadingFacebook());
  const isLoadingGG = useSelector(selectLoadingGoogle());
  const error = useSelector(selectError());
  const loading = useSelector(selectLoading());
  const [isSubmit, setSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const responseFacebook = (response) => {
    if (response?.status === 'unknown') {
      return;
    }
    dispatch(
      loginSocial({
        token: response.accessToken,
        type: 2,
        profileObj: {
          name: response.name,
          email: response.email,
          picture: response.picture
        }
      })
    );
  };

  useEffect(() => {
    const tokenExpiredLang = isTokenExpired();
    if (tokenExpiredLang) {
      // if (lang[tokenExpiredLang]) {
      //   toaster.error(lang[tokenExpiredLang]['token.expired']);
      // } else {
      //   toaster.error(lang['vi']['token.expired']);
      // }
      // clearToken();
    }
    return () => {
      dispatch(resetError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(resetError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const responseGoogle = (resp) => {
    console.log('google', resp)
    if (resp?.accessToken) {
      dispatch(
        loginSocial({
          token: resp.accessToken,
          profileObj: {
            name: resp?.profileObj.name,
            email: resp?.profileObj.email,
          },
          type: 1
        })
      );
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (email.trim() === '' || password.trim() === '') {
      return;
    }
    // if (!validateEmail(email)) {
    //   return;
    // }
    const body = {
      userName: email || '',
      password: password || ''
    };
    dispatch(login(body));
  };
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  }

  return (
    <LoginLayout>
      <div className='login-form'>

        {/* <div className='logo-mobile d-sm-none d-block'>
          <img src={BigLogo} alt='logo' />
        </div> */}
        <div className='form'>
          <Row className='header-form'>
            <Col span={12}>
              <img src={logo} className='logo' />
            </Col>
            <Col className='header-col-title'>
              <img src={line} className='line' height={24} />
              <span className='header-title'>Login</span>
            </Col>
          </Row>

          {/* <Divider>Hoặc</Divider> */}
          <form onSubmit={handleSubmit}>
            <div className='email-wrapper'>
              <label htmlFor='email'>
                <Input
                  id='email'
                  placeholder='Nhập e-mail'
                  autoComplete='off'
                  value={email}
                  onChange={handleChangeEmail}
                />
                {isSubmit && !email && email.trim() === '' && (
                  <p className='error'>Vui lòng nhập tên tài khoản</p>
                )}
                {/* {isSubmit && email && !validateEmail(email.trim()) && (
                  <p className='error'>Vui lòng nhập đúng định dạng email</p>
                )} */}
              </label>
            </div>
            <div className='password-wrapper'>
              <label htmlFor='password'>
                <Input
                  id='password'
                  type='password'
                  placeholder='Nhập mật khẩu'
                  autoComplete='off'
                  value={password}
                  onChange={handleChangePassword}
                />
                {isSubmit && !password && password.trim() === '' && (
                  <p className='error'>Vui lòng nhập mật khẩu</p>
                )}
              </label>
            </div>
            <div className='password-wrapper' style={{ minHeight: "3px" }}>
              <Row>
                <Switch defaultChecked onChange={onChangeSwitch} />
                <span className='remember'>Ghi nhớ tôi</span>
              </Row>

              <Link to={PAGES.forgotPass}>
                <span className='forget-password'>Quên mật khẩu?</span>
              </Link>
            </div>
            <Button
              loading={loading}
              htmlType='submit'
              className='btn-submit'
              onClick={handleSubmit}
            >
              Đăng nhập
            </Button>
            <Divider><span style={{ fontSize: "12px", color: "rgba(39, 39, 39, 0.6)" }}>Hoặc đăng nhập bằng</span></Divider>
            <Row gutter={4} className='login-social'>
              <Col span={8}>
                <GoogleLogin
                  clientId={GG_CLIENT_ID}
                  render={(renderProps) => (
                    <Button className='btn-social btn-google' onClick={renderProps.onClick} loading={isLoadingGG} >
                      <img src={logoGG} />
                      <span className='title-social'>Google</span>
                    </Button>
                  )}
                  buttonText=''
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  className='with-smedia google'
                  cookiePolicy={'single_host_origin'}
                />
              </Col>
              <Col span={8}>
                <FacebookLogin
                  appId={FB_APP_ID}
                  fields='name,email,picture'
                  callback={responseFacebook}
                  cssClass='ant-btn btn-facebook btn-social'
                  textButton={isLoadingFB ? <BoxLoading /> : <div className='btn-social-facebook'>
                    <img src={logoFB} height={20} width={20} />
                    <span className='title-social'>Facebook</span>
                  </div>}
                />
              </Col>
              <Col span={8}>
                <Button className='btn-zalo btn-social'>
                  <img src={logoZalo} />
                  <span className='title-social'>Zalo</span>
                </Button>
              </Col>
            </Row>
            <div className='not-have-account'>
              <span>
                Bạn chưa có tài khoản? <Link to={PAGES.register}>Đăng ký</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </LoginLayout>
  );
};

Login.propTypes = {};

export default Login;
