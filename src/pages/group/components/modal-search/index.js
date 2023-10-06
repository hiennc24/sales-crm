import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CloseButton from '../../../../assets/images/CloseSquare.svg';
import Rectangle340 from '../../../../assets/images/Rectangle340.svg';
import { withRouter } from "react-router-dom";

const formRef = React.createRef()

const ModalSearch = ({
    visibleModalSearch, onCloseModalSearch, history, groupId
}) => {

    const gotoListSearch = () => {
        const { text } = formRef.current.getFieldsValue()
        if (!text || text.trim() === "" || !groupId) return
        history.push(`/group-work/${groupId}/search-posts-group?s=${text.trim()}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            gotoListSearch()
        } else {
            return;
        }
    };

    return (
        <Form
            ref={formRef}
        >
            <Modal
                visible={visibleModalSearch}
                footer={null}
                closable={false}
                centered
                width={768}
                destroyOnClose
                bodyStyle={{ position: "relative" }}
                onCancel={onCloseModalSearch}
                className="customModalSearch"
                title={[
                    <div key="123" className="row-sb-center header-search-modal">
                        <span className="left b--700">Tìm kiếm trong nhóm</span>

                        <Form.Item
                            name="text"
                            noStyle
                        >
                            <Input
                                style={{ maxWidth: '22vw' }}
                                className="group-input customInputSearchIcon cursor-pointer"
                                placeholder="Tìm kiếm"
                                prefix={<SearchOutlined className="icon-search" onClick={gotoListSearch} />}
                                onKeyDown={handleKeyDown}
                            />
                        </Form.Item>


                        <img src={CloseButton} alt="" className="modal-icon" onClick={onCloseModalSearch} />
                    </div>
                ]}

            >
                <div className="pt--34 pb--53">
                    <div className="row-center">
                        <img src={Rectangle340} alt="" className="w--100 h--80" />
                    </div>

                    <div className="mt--13 mid-modal-text text-center">
                        Bạn đang tìm gì à?
                    </div>
                    <div className="mt--4 fs--14 lh--6 c-4E596F text-center">
                        Tìm kiếm bài viết của thành viên nhóm
                    </div>
                </div>
            </Modal>
        </Form>
    )
}

ModalSearch.propTypes = {
    visibleModalSearch: PropTypes.visibleModalSearch,
    onCloseModalSearch: PropTypes.onCloseModalSearch,
    history: PropTypes.history,
    groupId: PropTypes.groupId,
};

export default withRouter(ModalSearch);