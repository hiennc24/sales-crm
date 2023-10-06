/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { List, Checkbox, Input, Row, Col, Button } from "antd";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { voteAnswer } from "../../../../../../stores/posts/posts.action";
import PropTypes from 'prop-types';
import "./DetailsVote.scss";
import { getPost, addAnswer, voteAnswer } from "../../../../../../services/api/module/posts.api";


const CheckboxAsk = ({ IsMultipleAnswer, oder, handleInput, options, title, user, setPostData, postId, questionIndex }) => {

  const [voteNumberArray, setVoteNumberArray] = useState(options.map((item) => item.VoteNumber));
  const [voteOptions, setVoteOptions] = useState([...options]);
  const [voteArr, setVoteArr] = useState(options.map(item => item?.VoteUser && item?.VoteUser.find(u => u.Id === Number(user.Id)) ? true : false))


  const dispatch = useDispatch();

  useMemo(() => {
    if (!IsMultipleAnswer) {
      setVoteNumberArray(voteOptions.map((item) => item.VoteNumber))
      setVoteArr(voteOptions.map(item => item?.VoteUser && item?.VoteUser.find(u => u.Id === Number(user.Id)) ? true : false))
    }
    // console.log(voteOptions)
  }, [voteOptions])
  const handleVote = async (value, answerId, index) => {
    const newVoteNumberArray = JSON.parse(JSON.stringify(voteNumberArray));
    const newVoteArr = voteArr;

    //  console.log(voteArr)
    if (!IsMultipleAnswer) {


      if (value) {
        const isVote = voteOptions.find(item => item?.VoteUser && item?.VoteUser.find(u => u.Id === Number(user.Id)))
        const isVoteId = isVote ? isVote.Id : null;
        const isVoteIndex = voteOptions.indexOf(isVote);
        // const userArr = JSON.parse(isVote?.VoteUser).filter(u => u.Id !== Number(user.Id))
        await 
          voteAnswer({
            answerId,
            active: 1,
          });

        // if (isVoteId) {
        //   await dispatch(
        //     voteAnswer({
        //       isVoteId,
        //       active: 0,
        //     }));

        //   // newVoteArr[isVoteIndex] = false;
        //   // newVoteNumberArray[isVoteIndex] += -1;
        // }

        // newVoteNumberArray[index] += value ? 1 : -1;

        // setVoteNumberArray(newVoteNumberArray);

        // newVoteArr[index] = true;

        // setVoteArr(newVoteArr);
        // const newVoteOptions = voteOptions.map(item => {
        //   if (item.Id === isVoteId) return {...item, VoteUser: JSON.stringify(userArr)}
        //   return item
        // }) 

        // setVoteOptions(newVoteOptions);
        // console.log(newVoteOptions)
        getPost(postId).then(res => {
          // setPostData(res.data);
          setVoteOptions(res.data.Details[questionIndex].Details)
        }
        ).catch(err => console.log(err))
      }
      else {
        await 
          voteAnswer({
            answerId,
            active: 0,
          });
        // newVoteNumberArray[index] += -1;
        // setVoteNumberArray(newVoteNumberArray);
        // newVoteArr[index] = false;
        // setVoteArr(newVoteArr);

        getPost(postId).then(res => {
          // setPostData(res.data);
          setVoteOptions(res.data.Details[questionIndex].Details)
        }
        ).catch(err => console.log(err))
      }
    }


    if (IsMultipleAnswer) {
      await 
        voteAnswer({
          answerId,
          active: value ? 1 : 0,
        })
      ;

      newVoteNumberArray[index] += value ? 1 : -1;
      setVoteNumberArray(newVoteNumberArray);
      getPost(postId).then(res => {
        setPostData(res.data);
        // setVoteOptions(res.data.Details[questionIndex])
      }
      ).catch(err => console.log(err))
    }
  }

  return (
    <>
      <div className="post-ask-component" style={{ marginTop: 8 }}>
        <div className="ask-title" style={{ padding: '4px 11px' }}>
          {title.replace('<p>', '').replace('</p>', '')}
        </div>
        <div className={IsMultipleAnswer ? "answer-grid__multi" : "answer-grid"}>
          <Row gutter={0}>
            {voteOptions && voteOptions.map((option, index) => {


              const isVoted = option?.VoteUser && option?.VoteUser.map((option) => option.Id).includes(Number(user.Id))
              return (
                <Col span={12} key={index} className="answer-cell" >
                  {IsMultipleAnswer ?
                    <>
                      <Checkbox
                        id={`checkbox-${index}`}
                        onChange={(e) => handleVote(e.target.checked, option.Id, index)}
                        style={{ marginBottom: 4 }}
                        defaultChecked={isVoted}
                      // checked={voteArr[index]}
                      >

                        <div style={{ wordBreak: 'normal', width: '100%', whiteSpace: 'normal', marginBottom: -4, color: '#272727', fontSize: 12, padding: '0px 11px' }}>{option.Title}</div>
                      </Checkbox>
                      <div className="vote-number " >{voteNumberArray[index]} bình chọn</div>
                    </>
                    :
                    <>
                      <Checkbox
                        id={`checkbox-${index}`}
                        onChange={(e) => handleVote(e.target.checked, option.Id, index)}
                        style={{ marginBottom: 4 }}
                        // defaultChecked={isVoted}
                        checked={voteArr[index]}
                      >

                        <div style={{ wordBreak: 'normal', width: '100%', whiteSpace: 'normal', marginBottom: -4, color: '#272727', fontSize: 12, padding: '0px 11px' }}>{option.Title}</div>
                      </Checkbox>
                      <div className="vote-number " >{voteNumberArray[index]} bình chọn</div>
                    </>

                  }

                  {/* {isVoted ? 
                  <div className="vote-number" >{option.VoteNumber} bình chọn</div>
                :
                <div className="vote-number vote-hidden" >{option.VoteNumber} bình chọn</div>  
                } */}


                </Col>
              )
            }
            )}

          </Row>
        </div>

      </div>
    </>
  )
}

CheckboxAsk.propTypes = {
  IsMultipleAnswer: PropTypes.bool,
  oder: PropTypes.number,
  handleInput: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  user: PropTypes.object,
  setPostData: PropTypes.func,
  postId: PropTypes.string,
  questionIndex: PropTypes.number,

}


const CustomAsk = ({ questionId, questionIndex, postId, oder, handleInput, title, options }) => {
  const [optArr, setOptArr] = useState();
  const dispatch = useDispatch();
  const [ans, setAns] = useState('');
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setOptArr(options)
  }, [])
  const submitAns = async () => {
    const data =
    {
      "voteId": questionId,
      "order": questionIndex + 1,
      "title": ans
    }

 
    await addAnswer(data)
    setAns('')
    getPost(postId).then(res => {
      // setPostData(res.data);
      setOptArr([...res.data.Details[questionIndex].Details])
      // forceUpdate();
    }
    ).catch(err => console.log(err))
  }

  return (
    <>
      <div className="ask-component">
        <div className="ask-title">
          <Input
            placeholder=""
            // prefix={<div>{title === '' ? 'Câu hỏi:' : ''}</div>}
            value={title}
            // onChange={e => changeTitleInput(e.target.value)}
            disabled={true}
          />
        </div>


        <div className="border-gray-box">
          {optArr && optArr.map((item, index) => {
            return (
              <div key={index} style={{ borderLeft: 1, borderRight: 1, padding: '4px 11px', borderColor: 'rgba(39, 39, 39, 0.1)' }}>- Câu trả lời {index + 1}: {item.Title}</div>
            )
          })}
          <Input.TextArea
            rows={1}
            placeholder="Nội dung câu trả lời"
            value={ans}
            onChange={e => setAns(e.target.value)}
          />
          {ans !== '' &&
            <div style={{ display: 'flex', width: '100%', justifyContent: 'end', marginTop: 6 }}>
              <Button size="small" onClick={() => setAns('')}>Hủy</Button>
              <Button type="primary" size="small" style={{ marginLeft: 6, }} onClick={submitAns}><div style={{ color: "#fff" }}>Gửi</div></Button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

CustomAsk.propTypes = {
  oder: PropTypes.number,
  handleInput: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  user: PropTypes.object,
  setPostData: PropTypes.func,
  postId: PropTypes.string,
  questionIndex: PropTypes.number,
  questionId: PropTypes.number,
}

const DetailVote = ({ data, isSearch = false }) => {
  const [postData, setPostData] = useState(data)
  const dispatch = useDispatch();
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );

  const [voteNumberArray, setVoteNumberArray] = useState(
    data?.Details?.Details?.map((item) => item.VoteNumber)
  );

  const handleVote = (value, answerId, index) => {
    dispatch(
      voteAnswer({
        answerId,
        active: value ? 1 : 0,
      })
    );

    const newVoteNumberArray = JSON.parse(JSON.stringify(voteNumberArray));
    newVoteNumberArray[index] += value ? 1 : -1;
    setVoteNumberArray(newVoteNumberArray);
  };
  // console.log('isSearch', isSearch)
  useMemo(() => {
    // console.log(Array.isArray(data.Details))
    if (!Array.isArray(data.Details)) {
      getPost(data.Id).then(res => {
        setPostData(res.data)
        // console.log(res.data)
      }
      ).catch(err => console.log(err))
    }
  }, [data])
  return (
    <>
      {/* <div className="votes-content">
      <div className="vote-item">
        {!isSearch ? (<List
          itemLayout="vertical"
          dataSource={data?.Details.Details}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                className="checkbox-custom"
                onChange={(data) =>
                  handleVote(data.target.checked, item?.Id, index)
                }
                defaultChecked={
                  item?.VoteUser &&
                  JSON.parse(item?.VoteUser)
                    .map((item) => item.Id)
                    .includes(Number(userInfo.Id))
                }
              >
                <div className="vote-content">{item?.Title}</div>
                {voteNumberArray[index] ? (
                  <p className="vote-count">{voteNumberArray[index]} lượt bình chọn</p>
                ) : (
                  <p className="vote-count">0 lượt bình chọn</p>
                )}
              </Checkbox>
            </List.Item>
          )}
        />
        ) : (<List
          itemLayout="vertical"
          dataSource={data?.Details.Details}
          renderItem={(item, index) => (
            <List.Item>
              <div className="checkbox-custom-search">

                <div className="vote-content">{item?.Title}</div>
                {voteNumberArray[index] ? (
                  <p className="vote-count">{voteNumberArray[index]} lượt bình chọn</p>
                ) : (
                  <p className="vote-count">0 lượt bình chọn</p>
                )}
              </div>
            </List.Item>
          )}
        />)}
      </div>
    </div> */}

      <div>
        {(postData?.Details.length > 0) && (postData?.TypeVote === 3)
          && postData?.Details.map((item, index) => (
            <div key={index}>
              <CustomAsk
                questionId={item.Id}
                questionIndex={index}
                title={item.Title}
                options={item.Details}
                IsMultipleAnswer={item.IsMultipleAnswer}
                user={userInfo}
                setPostData={setPostData}
                postId={postData.Id}
              />
            </div>))}

        {(postData?.Details.length > 0) && (postData?.TypeVote < 2)
          && postData?.Details.map((item, index) => (
            <div key={index}>
              <CheckboxAsk
                questionIndex={index}
                title={item.Title}
                options={item.Details}
                IsMultipleAnswer={item.IsMultipleAnswer}
                user={userInfo}
                setPostData={setPostData}
                postId={postData.Id}
              />
            </div>))}
      </div>
    </>
  );
};

export default DetailVote;
