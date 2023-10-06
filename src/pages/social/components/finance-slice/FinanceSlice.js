import React, { useState } from "react";
import "./finance-slice.style.scss";
import Chart from "../../../../assets/new/header-post/chart.svg";
import Chart2 from "../../../../assets/new/header-post/chart-2.svg";
import Chart3 from "../../../../assets/new/header-post/chart-3.svg";

const FinanceSlice = () => {
  const [tab, setTab] = useState(3);

  const onChangeTab = (tab) => {
    setTab(tab);
  };

  return (
    <div className="financy-slice" style={{ height: "fit-content" }}>
      <div className="financy-slice__header">
        <div
          className={`financy-slice__header--item ${tab === 1 ? "active" : ""}`}
          onClick={() => onChangeTab(1)}
          style={{ flexGrow: 1 }}
        >
          InCom
        </div>
        {tab !== 1 && tab !== 2 && <div style={{display:'flex', alignItems:'center'}}> <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', width:1, height:25}}></div></div>}
        <div
          className={`financy-slice__header--item ${tab === 2 ? "active" : ""}`}
          onClick={() => onChangeTab(2)}
          style={{ flexGrow: 1 }}
        >
          Sale & CRM
        </div>
        {tab !== 2 && tab !== 3 && <div style={{display:'flex', alignItems:'center'}}> <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', width:1, height:25}}></div></div>}
        <div
          className={`financy-slice__header--item ${tab === 3 ? "active" : ""}`}
          onClick={() => onChangeTab(3)}
          style={{ flexGrow: 1 }}
        >
          Finance
        </div>
        {tab !== 3 && tab !== 4 && <div style={{display:'flex', alignItems:'center'}}> <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', width:1, height:25}}></div></div>}
        <div
          className={`financy-slice__header--item ${tab === 4 ? "active" : ""}`}
          onClick={() => onChangeTab(4)}
          style={{ flexGrow: 1 }}
        >
          HR
        </div>
      </div>
      <div className="financy-slice__body">
        {tab === 1 ? (
          <div className="financy-slice__body--tab1">InCom</div>
        ) : tab === 2 ? (
          <div className="financy-slice__body--tab2">Sale & CRM</div>
        ) : tab === 3 ? (
          <div className="financy-slice__body--tab3">
            <div>
              <img src={Chart} />
              <div style={{ height: 4, backgroundColor: "#E9F0F4" }} />
              <img src={Chart2} />
              <div style={{ height: 4, backgroundColor: "#E9F0F4" }} />
              <img src={Chart3} />
            </div>
          </div>
        ) : (
          <div className="financy-slice__body--tab4">HR</div>
        )}
      </div>
    </div>
  );
};
export default FinanceSlice;
