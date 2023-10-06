import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    DatePicker,
    Select,
    Button,
    Dropdown,
    Menu,
    Avatar,
    Space,
    Tooltip,
    Image,
    Row,
    Col,
    Checkbox,
    Input
} from 'antd';
import { getPost, addAnswer, voteAnswer } from "../../../../../services/api/module/posts.api";
import { useSelector } from 'react-redux';

const CheckboxAsk = ({ IsMultipleAnswer, oder, handleInput, askData, user }) => {

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([{ Title: "" }, { Title: "" }, { Title: "" }, { Title: "" }])
    const changeAnsInput = (value, index) => {
        let optionOder = 0;
        const optionArr = options.map((option, i) => {
            if (i === index) {
                return { Title: value }
            }
            else return option
        });

        setOptions(optionArr);
        // const ans = optionArr.filter(option => {

        //     if (option.Title !== '') {
        //         optionOder = optionOder +1;
        //         return {
        //             Title: option.Title,
        //             optionOder: optionOder
        //         }
        //     }
        // })
        const ansArr = optionArr.filter(option => option.Title !== '')
        const ans = ansArr.map(an => {
            optionOder = optionOder + 1;
            return {
                Title: an.Title,
                Oder: optionOder
            }
        })
        if (title !== '') {
            const data = {
                title: title,
                ans: ans
            }
            handleInput(data, oder);
        }
    }

    const changeTitleInput = (value) => {
        setTitle(value)
        const data = {
            title: value,
            ans: options
        }
        handleInput(data, oder);
    }
    return (
        <>
            {askData?.Details ?

                <>
                    <div className="ask-component">
                        <div className="ask-title">
                            <Input
                                placeholder=""
                                value={askData.Title}
                            />
                        </div>
                        <div className={IsMultipleAnswer === 1 ? "answer-grid__multi" : "answer-grid"}>
                            <Row gutter={0}>
                                {askData?.Details.map((option, index) => {
                                    const isVoted = option?.VoteUser && option?.VoteUser.map((option) => option.Id).includes(Number(user.Id))
                                    return (

                                        <Col span={12} key={index} className="answer-cell">
                                            <Checkbox
                                                // onChange={onChange}
                                                checked={isVoted ? true : false}
                                                disabled
                                            >
                                                <Input placeholder={`Phương án ${index + 1}`} value={option.Title}
                                                />
                                            </Checkbox>
                                        </Col>
                                    )
                                }


                                )}


                            </Row>
                        </div>

                    </div>
                </>
                :
                <>
                    <div className="ask-component">
                        <div className="ask-title">
                            <Input
                                placeholder=""
                                prefix={<div>{title === '' ? 'Câu hỏi:' : ''}</div>}
                                value={title}
                                onChange={e => changeTitleInput(e.target.value)}
                            />
                        </div>
                        <div className={IsMultipleAnswer === 1 ? "answer-grid__multi" : "answer-grid"}>
                            <Row gutter={0}>
                                {options.map((option, index) => (
                                    <Col span={12} key={index} className="answer-cell">
                                        <Checkbox
                                        // onChange={onChange}
                                        disabled
                                        >
                                            <Input placeholder={`Phương án ${index + 1}`} value={option.Title}
                                                onChange={(e) => changeAnsInput(e.target.value, index)}
                                            />
                                        </Checkbox>
                                    </Col>
                                ))}
                                <Col span={12} className="answer-cell" style={{ display: 'flex', alignItems: 'center', minHeight: 38 }}>
                                    <div onClick={() => {
                                        const newListOption = [...options, { Title: "" }]
                                        setOptions(newListOption)
                                    }}
                                        style={{ fontStyle: 'italic', fontSize: 12, cursor: 'pointer' }}
                                    >
                                        + Thêm phương án
                                    </div>
                                </Col>

                            </Row>
                        </div>

                    </div>
                </>
            }
        </>
    )
}

CheckboxAsk.propTypes = {
    IsMultipleAnswer: PropTypes.number,
    oder: PropTypes.number,
    handleInput: PropTypes.func,
    askData: PropTypes.object,
    user: PropTypes.object,
}

const CustomAsk = ({ oder, handleInput, askData, user }) => {

    const [title, setTitle] = useState('');
    const [ans, setAns] = useState('');

    const changeTitleInput = (value) => {
        setTitle(value)
        const data = {
            title: value,
            ans: ans && ans !== '' ? [{ Title: ans, Oder: 1, IsQuestion: true }] : []
        }
        handleInput(data, oder, true);
    }

    const changeAns = (value) => {
        setAns(value)
        const data = {
            title: title,
            ans: value && value !== '' ? [{ Title: value, Oder: 1, IsQuestion: true }] : []
        }
        handleInput(data, oder, true);
    }

    return (
        <>
            {askData?.Details ?
                <>
                    <div className="ask-component">
                        <div className="ask-title">
                            <Input
                                placeholder=""

                                value={askData.Title}

                            />
                        </div>
                        <div className="border-gray-box">
                        {askData.Details && askData.Details.map((item, index) => {
                            return (
                                <div key={index} style={{ borderLeft: 1, borderRight: 1, padding: '4px 11px', borderColor: 'rgba(39, 39, 39, 0.1)', fontSize:14 }}>- Câu trả lời {index + 1}: {item.Title}</div>
                            )
                        })}
                        </div>
 


                    </div>
                </>
                :
                <>
                    <div className="ask-component">
                        <div className="ask-title">
                            <Input
                                placeholder=""
                                prefix={<div>{title === '' ? 'Câu hỏi:' : ''}</div>}
                                value={title}
                                onChange={e => changeTitleInput(e.target.value)}
                            />
                        </div>

                        <div style={{ marginBottom: 8 }}>
                            <Input.TextArea
                                rows={3}
                                placeholder="Nội dung câu trả lời"
                                value={ans}
                                onChange={e => changeAns(e.target.value)}
                            />
                        </div>
                    </div>
                </>
            }

        </>
    )
}

CustomAsk.propTypes = {
    oder: PropTypes.number,
    handleInput: PropTypes.func,
    askData: PropTypes.object,
    user: PropTypes.object,
}


const EditPoll = ({ setVoteDetails, setTypeVote, isEditType, postId }) => {
    const [pollType, setPollType] = useState(1);
    const [postData, setPostData] = useState();
    const userInfo = useSelector((state) =>
        state.get("userProfile").get("profile")
    );

    const [asks, setAsks] = useState([{
        Title: "",
        Order: 1,
        IsQuestion: false,
        IsMultipleAnswer: 1,
        Answer: []
    }])

    const selectType = (type) => {
        setPollType(type)
        setTypeVote(type)
    }

    useEffect(() => {
        getPost(postId).then(res => {
            // console.log(res.data)
            setPollType(res.data.TypeVote)
            setTypeVote(res.data.TypeVote)
            setPostData(res.data.Details)

            setAsks(res.data.Details)

        }
        ).catch(err => console.log(err))
    }, [])

    const handleInput = (data, oder, IsQuestion) => {
        const askArr = asks.map((ask, i) => {
            if (ask.Order === oder) {

                return {
                    ...ask,
                    Title: data.title,
                    IsQuestion: IsQuestion ? IsQuestion : false,
                    Answer: [
                        ...data.ans
                    ]
                }
            }
            else return ask
        })
        setAsks(askArr);
        setVoteDetails(askArr)

    }
    return (
        <>
            <div className='post-row task-row'>

                <div className='task-time-wrapper'>
                    <div className='task-time'>
                        <div>
                            <p className='post-row-label'>Loại câu hỏi:</p>
                        </div>
                        <Select
                            className='select-task-time'
                            value={pollType}
                        // onChange={(e) => {
                        //     selectType(e);
                        //     if (e < 2) {
                        //         setAsks([
                        //             {
                        //                 Title: "",
                        //                 Order: 1,
                        //                 IsMultipleAnswer: e,
                        //                 Answer: []
                        //             }
                        //         ])
                        //     }
                        //     else {
                        //         setAsks([
                        //             {
                        //                 Title: "",
                        //                 Order: 1,
                        //                 IsMultipleAnswer: 0,
                        //                 Answer: []
                        //             }
                        //         ])
                        //     }
                        // }}
                        >
                            {pollType === 0 && <Select.Option value={0}>Một phương án trả lời</Select.Option>}
                            {pollType === 1 && <Select.Option value={1}>Nhiều phương án trả lời</Select.Option>}
                            {pollType === 3 && <Select.Option value={3}>Trả lời tùy chỉnh</Select.Option>}
                        </Select>
                    </div>
                </div>

                {pollType === 0 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CheckboxAsk user={userInfo} IsMultipleAnswer={0} oder={index + 1} handleInput={handleInput} askData={ask} />
                            </div>
                        )}


                    </div>
                }
                {pollType === 1 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CheckboxAsk user={userInfo} IsMultipleAnswer={1} oder={index + 1} handleInput={handleInput} askData={ask} />
                            </div>
                        )}


                    </div>
                }

                {pollType === 3 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CustomAsk user={userInfo} oder={index + 1} handleInput={handleInput} askData={ask} />
                            </div>
                        )}


                    </div>
                }
                <div
                    onClick={() => {
                        const listAsk = asks;
                        const askOder = listAsk.length + 1;
                        const newAsk = {
                            Title: "",
                            Order: askOder,
                            IsMultipleAnswer: pollType,
                            Answer: []
                        }
                        setAsks([...listAsk, newAsk])
                    }
                    }

                    style={{ color: '#32A1C8', marginLeft: 12, marginBottom: 24, width: 'fit-content', cursor: 'pointer', fontSize: 14 }}
                >+ Thêm câu hỏi</div>
            </div>
        </>
    )
}

EditPoll.propTypes = {
    setVoteDetails: PropTypes.func,
    setTypeVote: PropTypes.func,
    isEditType: PropTypes.bool,
    postId: PropTypes.string,
}

export default EditPoll;