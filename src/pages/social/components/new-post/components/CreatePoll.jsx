import React, { useState, useEffect } from 'react';
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

const CheckboxAsk = ({ IsMultipleAnswer,oder, handleInput }) => {

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([{ Title: "" }, { Title: "" }, { Title: "" }, { Title: "" }])
    const changeAnsInput = (value, index) => {
        let optionOder = 0;
        const optionArr = options.map((option, i) => {
            if (i === index) {
                return {Title:value}
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
            optionOder = optionOder +1;
            return {
                Title: an.Title,
                Oder: optionOder
            }
        })
        if (title !== '') {
            const data ={
                title: title,
                ans: ans
            }
            handleInput(data, oder);
        }
    }

    const changeTitleInput = (value) => {
        setTitle(value)
        const data ={
            title: value,
            ans: options
        }
        handleInput(data, oder);
    }
    return (
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
    )
}

CheckboxAsk.propTypes = {
    IsMultipleAnswer: PropTypes.number,
    oder: PropTypes.number,
    handleInput: PropTypes.func
}

const CustomAsk = ({oder, handleInput}) => {

    const [title, setTitle] = useState('');
    const [ans, setAns] = useState('');

    const changeTitleInput = (value) => {
        setTitle(value)
        const data ={
            title: value,
            ans: ans && ans !== '' ? [{Title: ans, Oder: 1, IsQuestion: true}] : []
        }
        handleInput(data, oder, true);
    }

    const changeAns = (value) => {
        setAns(value)
        const data ={
            title: title,
            ans: value && value !== '' ? [{Title: value, Oder: 1, IsQuestion: true}] : []
        }
        handleInput(data, oder, true);
    }

    return (
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
    )
}

CustomAsk.propTypes = {
    oder: PropTypes.number,
    handleInput: PropTypes.func
}


const CreatePoll = ({setVoteDetails, setTypeVote}) => {
    const [pollType, setPollType] = useState(1);

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
        setTypeVote(1)
    }, [])

    const handleInput = (data, oder, IsQuestion) => {
        const askArr = asks.map((ask, i) =>{
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
                            onChange={(e) => {
                                selectType(e);
                                if (e < 2) {
                                    setAsks([
                                        {
                                            Title: "",
                                            Order: 1,
                                            IsMultipleAnswer: e,
                                            Answer: []
                                        }
                                    ])
                                }
                                else {
                                    setAsks([
                                        {
                                            Title: "",
                                            Order: 1,
                                            IsMultipleAnswer: 0,
                                            Answer: []
                                        }
                                    ])
                                }
                            }}
                        // options={[
                        //   { label: 'Một phương án trả lời', value: 1 },
                        //   { label: 'Nhiều phương án trả lời', value: 2 },
                        //   { label: 'Trả lời tùy chỉnh', value: 3 },
                        // ]}
                        >
                            <Select.Option value={0}>Một phương án trả lời</Select.Option>
                            <Select.Option value={1}>Nhiều phương án trả lời</Select.Option>
                            <Select.Option value={3}>Trả lời tùy chỉnh</Select.Option>
                        </Select>
                    </div>
                </div>

                {/* <p className='post-row-label' style={{ width: '100%' }}>
                    Các lựa chọn:
                </p>

                <div className='list-task-options mt--10'>
                {votes.map((_item, index) => (
                  !_item.isDeleted &&
                  <div className='task-item' key={index}>
                    <input
                      value={_item.Title}
                      disabled={_item.disable}
                      placeholder={'Nhập lựa chọn'}
                      className='task-item-input'
                      onChange={(e) => onChangeVote(index, e.target.value)}
                    /><img className='delete-icon'
                      src={IconDelete}
                      alt='icon delete'
                      onClick={() => deleteVote(_item, index)}
                    />
                  </div>
                ))}
                <Tooltip placement="top" title={'Thêm lựa chọn'}>
                  <img className='add-icon'
                    src={IconAdd}
                    alt='icon add'
                    // onClick={() => handleCreateVote('')}
                  />
                </Tooltip>
              </div> */}

                {pollType === 0 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CheckboxAsk IsMultipleAnswer={0} oder={index+ 1} handleInput={handleInput}/>
                            </div>
                        )}


                    </div>
                }
                {pollType === 1 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CheckboxAsk IsMultipleAnswer={1} oder={index + 1} handleInput={handleInput}/>
                            </div>
                        )}


                    </div>
                }

                {pollType === 3 && asks.length > 0 &&
                    <div>
                        {asks.map((ask, index) =>
                            <div key={index}>
                                <CustomAsk oder={index +1} handleInput={handleInput}/>
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

                    style={{ color: '#32A1C8', marginLeft: 12, marginBottom: 24, width: 'fit-content', cursor: 'pointer', fontSize:14 }}
                >+ Thêm câu hỏi</div>
            </div>
        </>
    )
}

CreatePoll.propTypes = {
    setVoteDetails: PropTypes.func,
    setTypeVote: PropTypes.func
}

export default CreatePoll;