import React from "react";
import PropTypes from 'prop-types';

import { Input, Form } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import IconSearch from '../../../../assets/new/group/ico_search.svg'

const formRef = React.createRef()

const LeftSelect = ({ keySearch, setKeySearch }) => {

    const onSearch = () => {
        const { keyword } = formRef.current.getFieldsValue()

        console.log("EEEE")
        setKeySearch(keyword)
    }

    return (
        <div className="recent-news">
            <div className="section-title">
                <p className="fs--18 font-weight--bold c-262B32">Kết quả tìm kiếm</p>
            </div>
            <div className="recent-news-list">
                <div>
                    <Form
                        ref={formRef}
                        initialValues={{
                            keyword: keySearch,
                        }}
                        noStyle
                    >
                        <Form.Item name="keyword">
                            <Input
                                style={{ height: '45px' }}
                                className="group__search--input cursor-pointer"
                                placeholder="Tìm kiếm"
                                prefix={<img src={IconSearch} alt="icon search" onClick={ onSearch }/>}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

LeftSelect.propTypes = {
    keySearch: PropTypes.keySearch,
    setKeySearch: PropTypes.setKeySearch,
};

export default LeftSelect;
