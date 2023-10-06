import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio, Button, Switch, message } from 'antd';
import CloseButton from '../../../../assets/images/CloseSquare.svg';
import { withRouter } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { actionGetListUserInviteGroup } from '../../Group.action';
// import { selectListUserInviteGroup } from '../../Group.selector';
import './modal-notification.scss'

const formRef = React.createRef()

const ModalNotification = ({
    visibleModalNotification, onCloseModalNotification, groupId
}) => {

    // const dispatch = useDispatch()

    const [notiPost, setNotiPost] = useState(0)
    const [notiRequest, setNotiRequest] = useState(true)
    let listSaveLocalStorage = []

    useEffect(() => {
        if (localStorage.getItem("listSaveLocalStorage")) {

            listSaveLocalStorage = JSON.parse(localStorage.getItem("listSaveLocalStorage"))
            const data = listSaveLocalStorage.find(it => it.groupId === groupId)

            setNotiRequest(data.notiRequest)
            setNotiPost(data.notiPost)
        }
    }, [])

    const onSubmit = async () => {
        const index = listSaveLocalStorage.findIndex(it => it.groupId === groupId)

        if (index === -1) {
            listSaveLocalStorage.push({
                groupId,
                notiPost,
                notiRequest,
            })
        }
        else {
            listSaveLocalStorage[index] = {
                groupId,
                notiPost,
                notiRequest,
            }
        }

        localStorage.setItem("listSaveLocalStorage", JSON.stringify(listSaveLocalStorage))
        message.success("Cấu hình thành công")
        onCloseModalNotification()
    }


    return (
        <Form
            ref={formRef}
        >
            <Modal
                visible={visibleModalNotification}
                footer={null}
                closable={false}
                centered
                width={768}
                destroyOnClosef
                bodyStyle={{ position: "relative" }}
                onCancel={onCloseModalNotification}
                className="customModalSearch"
                title={[
                    <div key="123" className="row-sb-center header-search-modal">
                        <div></div>
                        <span className="left b--700 font-weight--bold c-262B32">Cài đặt thông báo</span>
                        <img src={CloseButton} alt="" className="modal-icon" onClick={onCloseModalNotification} />
                    </div>
                ]}

            >
                <div>
                    <Radio.Group
                        className="width100"
                        onChange={(e) => setNotiPost(e.target.value)}
                        value={notiPost}
                    >
                        <div className="px--21 py--28">
                            <div className="row-sb-center mb--24">
                                <div>
                                    <div className="fs--16 lh-18 c-262B32 font-weight--bold">Tất cả bài viết</div>
                                    <div className="fs--14 lh-16 c-6E7B94">Mọi bài viết trong nhóm</div>
                                </div>
                                <div>
                                    <Radio className="custom__radio--noti" value={0}></Radio>
                                </div>
                            </div>
                            <div className="row-sb-center mb--24">
                                <div>
                                    <div className="fs--16 lh-18 c-262B32 font-weight--bold">Tin nổi bật</div>
                                    <div className="fs--14 lh-16  c-6E7B94">Bài viết gợi ý- Bài viết có nhắc đến bạn</div>
                                </div>
                                <div>
                                    <Radio className="custom__radio--noti" value={1}></Radio>
                                </div>
                            </div>
                            <div className="row-sb-center mb--24">
                                <div>
                                    <div className="fs--16 lh-18 c-262B32 font-weight--bold">Tắt</div>
                                    <div className="fs--14 lh-16  c-6E7B94">Chỉ những lượt nhắc và cập nhật quan trọng về cài đặt hoặc quyền riêng tư của nhóm</div>
                                </div>
                                <div>
                                    <Radio className="custom__radio--noti" value={2}></Radio>
                                </div>
                            </div>

                            <div className="row-sb-center mb--24 pt--28" style={{ borderTop: '1px solid #E9F0F4' }}>
                                <div>
                                    <div className="fs--16 lh-18 c-262B32 font-weight--bold">Thông báo về yêu cầu tham gia</div>
                                    <div className="fs--14 lh-16  c-6E7B94">Nhận thông báo khi có người yêu cầu tham gia</div>
                                </div>
                                <div>
                                    <Switch
                                        className="group__custom--switch"
                                        checked={notiRequest}
                                        onChange={() => setNotiRequest(!notiRequest)}
                                    />
                                </div>
                            </div>

                            <div className="row-end">
                                <Button
                                    onClick={onCloseModalNotification}
                                    className="btn-cancel mr--16 c-414346"
                                    style={{ width: '80px', boxShadow: 'none' }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    className="group__btn--save"
                                    onClick={onSubmit}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>

                    </Radio.Group>
                </div>
            </Modal>
        </Form>
    )
}

ModalNotification.propTypes = {
    visibleModalNotification: PropTypes.visibleModalNotification,
    onCloseModalNotification: PropTypes.onCloseModalNotification,
    groupId: PropTypes.groupId,
};

export default withRouter(ModalNotification);