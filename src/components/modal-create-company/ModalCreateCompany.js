import React, { useState } from "react";
import { Modal, Button, Input, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import info from '../../assets/images/info.svg'
import { slugify, validateDomain } from "../../utils";
import API from "../../services/api";
import { createCompanySuccess } from "../../pages/home/Home.action";
import toaster from "../../components/toaster";
import BoxLoading from "../box-loading/BoxLoading";
import "./ModalCreateCompany.scss";
import errors from "../../constants/error";

const ModalCreateCompany = ({ isShow, onToggle, setIsShow }) => {
  const FIX_DOMAIN = ".abizin.crm.vn";

  const dispatch = useDispatch();
  const [domain, setDomain] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const handleChangeDomain = (e) => {
    setDomain(e.target.value);
  };

  const onClose = () => {
    setDomain("");
    setCompanyName("");
    setSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!domain || !companyName) {
      return;
    }

    if (!validateDomain(domain.toLowerCase() + FIX_DOMAIN)) {
      return;
    }

    // dispatch(
    //   createCompany({
    //     Slugname: slugify(domain),
    //     CompanyName: companyName,
    //     CompanyShortName: companyName,
    //   })
    // );

    setLoading(true);
    API.company
      .createCompany({
        Slugname: slugify(domain),
        CompanyName: companyName,
        CompanyShortName: companyName,
      })
      .then((result) => {
        if (result?.message === "DUPLICATE_SLUG") {
          toaster.error(errors[result.message]);
        } else {
          dispatch(createCompanySuccess(result.data));
          onToggle();
        }
        setLoading(false);
      })
      .catch((e) => {
        toaster.error(e);
        setLoading(false);
      });
  };

  const content = () => {
    return <div style={{ width: '600px' }}>
      <p>Tên miền thường gắn với tên công ty và thương hiệu của doanh nghiệp do vậy bạn nên nghiên cứu kỹ lưỡng trước khi quyết định đặt tên cho website của mình. Chúng ta nên tuân thủ các quy tắc sau:</p>
      <ul>
        <li>Tên miền không được vượt quá 63 ký tự, bao gồm cả phần .com, .net, .org</li>
        <li>Tên miền chỉ bao gồm các ký tự trong bảng chữ cái (a-z), các số (0-9) và dấu trừ (-).</li>
        <li>Các khoảng trắng và các ký tự đặc biệt trong tên miền khác đều không hợp lệ.</li>
        <li>Không thể bắt đầu bằng hoặc kết thúc tên miền bằng dấu trừ (-).</li>
        <li>Tên miền càng ngắn càng tốt, dễ nhớ, không gây nhầm lẫn, khó viết sai.</li>
        <li>Tên miền nên liên quan đến tên chủ thể hoặc lĩnh vực hoạt động của doanh nghiệp.</li>
      </ul>
    </div>
  }

  return (
    <Modal
      width={620}
      centered
      visible={isShow}
      footer={null}
      wrapClassName="modal-create-company"
      onCancel={onToggle}
      afterClose={onClose}
    >
      <div className="modal-create-company-wrapper">
        <div className="modal-header">
          <h3 className="title">
            <span>Tạo mới Công ty</span>
          </h3>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '0 30px 20px 30px' }}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="name-company">
                <label htmlFor="name">
                  <span>Tên Công ty</span>
                  <Input
                    id="name"
                    placeholder="Nhập tên công ty của bạn..."
                    value={companyName}
                    onChange={handleChangeCompanyName}
                  />
                  {isSubmit && !companyName && (
                    <p className="error">Vui lòng nhập tên công ty</p>
                  )}
                </label>
              </div>
              <div className="domain-company">
                <label htmlFor="domain">
                  <div className="domain__link">
                    <span>Đường dẫn</span>
                    <Tooltip placement="right" title={content} style={{ width: '500px' }}>
                      <img src={info} style={{ marginLeft: '5px' }}/>
                    </Tooltip>
                  </div>
                  <div className="domain-company-inner">
                    <Input
                      id="domain"
                      className="input-company"
                      placeholder="Nhập tên miền công ty..."
                      addonAfter={<span>.abizin.crm.vn</span>}
                      value={domain}
                      onChange={handleChangeDomain}
                    />
                    {/* <img src={Edit} alt="edit" /> */}
                    {isSubmit && !domain && (
                      <p className="error">Vui lòng nhập tên tên miền</p>
                    )}
                    {isSubmit &&
                      !validateDomain(domain.toLowerCase() + FIX_DOMAIN) && (
                        <p className="error">Tên miền sai định dạng</p>
                      )}
                  </div>
                </label>
                <p className="new-domain">
                  Đường dẫn đầy đủ:{" "}
                  <span>
                    {domain
                      ? slugify(domain.toLowerCase()) + FIX_DOMAIN
                      : FIX_DOMAIN}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button className="btn-cancel" onClick={() => setIsShow(false)}>
              Hủy
            </Button>
            <Button htmlType="submit" className="btn-create" onClick={handleSubmit}>
              {isLoading ? <BoxLoading /> : "Tạo"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ModalCreateCompany.propTypes = {
  isShow: PropTypes.bool,
  setIsShow: PropTypes.func,
  onToggle: PropTypes.func,
};

export default ModalCreateCompany;
