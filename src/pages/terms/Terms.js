import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
// import PropTypes from "prop-types";
import LayoutSetting from "../../components/LayoutSetting";
import "./Terms.scss";
import { Row, Col, Card } from "antd";
import { getMenuSetting } from "../../utils";

import TermsImg from "../../assets/images/terms.png";
import LayoutMain from "../../components/LayoutMain";
import Scrollbars from "react-custom-scrollbars";
import SideBar from "../../components/sidebar";
;

const Terms = () => {
  const menu = getMenuSetting("terms");

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if(collapseLeft && collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if(collapseLeft || collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page">
            <LayoutSetting menu={menu}>
              <Card
                title={<span className="title">Điều khoản và Dịch vụ</span>}
                bordered={false}
                style={{ width: "100%", borderRadius: "10px" }}
              >
                <div className="terms-body">
                  <div className="terms-image">
                    <img src={TermsImg} alt="terms" />
                  </div>
                  <div className="terms-content">
                    <p className="read-more">
                      Đọc các điều khoản của chúng tôi bên dưới để tìm hiểu thêm về các
                      quyền và trách nhiệm của bạn với tư cách là người dùng ABIZIN
                    </p>
                    <p className="update-date">Cập nhật ngày 08/05/2021</p>
                    <p className="content">
                      Điều khoản dịch vụ này (&quot;Điều khoản&quot;) mô tả các quyền và
                      trách nhiệm áp dụng cho việc bạn sử dụng các trang web, dịch vụ và
                      ứng dụng dành cho thiết bị di động của ABIZIN (gọi chung là
                      &quot;Dịch vụ&quot;), từng được sở hữu và điều hành bởi ABIZIN
                      Holdings Ltd. (&quot;ABIZIN &quot;,&quot; Chúng tôi &quot;,&quot;
                      của chúng tôi &quot;hoặc&quot; chúng tôi &quot;).
                    </p>
                    <p className="content">
                      Vui lòng đọc kỹ Điều khoản trước khi sử dụng Dịch vụ. Nếu bạn
                      không đồng ý với Điều khoản, cũng như Chính sách quyền riêng tư
                      của ABIZIN (&quot;Chính sách quyền riêng tư&quot;) và Nguyên tắc
                      cộng đồng của ABIZIN (&quot;Nguyên tắc cộng đồng&quot;), bạn có
                      thể không sử dụng Dịch vụ. Nếu bạn tham gia Điều khoản thay mặt
                      cho một công ty hoặc pháp nhân khác, bạn tuyên bố rằng bạn có
                      quyền ràng buộc pháp nhân đó với các Điều khoản. Nếu bạn không có
                      quyền đó, bạn không được chấp nhận các Điều khoản hoặc sử dụng
                      Dịch vụ thay mặt cho pháp nhân đó. Dịch vụ chỉ có sẵn cho bạn nếu
                      bạn đã bước vào độ tuổi trưởng thành trong khu vực tài phán cư trú
                      của mình và hoàn toàn có thể và đủ năng lực để tham gia, tuân thủ
                      và tuân thủ các Điều khoản.
                    </p>
                    <p className="content">
                      Tài khoản ABIZIN của bạn. Nếu bạn tạo tài khoản trên Dịch vụ
                      (&quot;Tài khoản&quot; của bạn), bạn có trách nhiệm duy trì tính
                      bảo mật cho Tài khoản của mình và Nội dung của nó (như được định
                      nghĩa bên dưới) và bạn hoàn toàn chịu trách nhiệm về tất cả các
                      hoạt động xảy ra trong Tài khoản của bạn và bất kỳ các hành động
                      được thực hiện trên Dịch vụ. Bạn không được mô tả hoặc chỉ định
                      Nội dung cho Tài khoản của mình theo cách gây hiểu lầm hoặc bất
                      hợp pháp, bao gồm cả theo cách nhằm mục đích thương mại trên tên
                      tuổi hoặc danh tiếng của người khác và ABIZIN có thể thay đổi hoặc
                      xóa bất kỳ mô tả hoặc từ khóa nào mà nó cho là không phù hợp hoặc
                      bất hợp pháp, hoặc nếu không có khả năng gây ra trách nhiệm
                      ABIZIN. Bạn phải thông báo ngay cho ABIZIN về mọi hành vi sử dụng
                      trái phép Tài khoản của bạn hoặc bất kỳ vi phạm bảo mật nào khác.
                      ABIZIN sẽ không chịu trách nhiệm đối với bất kỳ hành vi hoặc thiếu
                      sót nào của bạn, bao gồm bất kỳ thiệt hại nào thuộc bất kỳ hình
                      thức nào phát sinh do hậu quả của những hành vi hoặc thiếu sót đó.
                    </p>
                  </div>
                </div>
              </Card>
            </LayoutSetting>
          </div>
        </div>
      </div>
    </LayoutMain>

  );
};

Terms.propTypes = {};

export default Terms;
