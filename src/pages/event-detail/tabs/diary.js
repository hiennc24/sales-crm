import { Card, Collapse, Typography, Input, Button, Space, Tooltip, DatePicker, Col, Select, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import AvatarCustom from '../../../components/avatar-custom';
import { getUrlImage, Icons } from '../../../utils';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageIcon from "../../../assets/new/create-post/img.svg";
import ToolAttachIcon from "../../../assets/new/create-post/add-file.svg";
import { Colors } from '../../../utils/colors';
import AutoResizeTextBox from "../../../components/auto-resize-textbox";
import MultiSelect from '../../../components/multi-select';
import AddUserIcon from "../../../assets/images/add-user.png";
import DeleteIcon from "../../../assets/images/delete.png";
import EditIcon from '../../../assets/new/common/pen.png';
import API from '../../../services/api';
import moment from 'moment';
import './style.scss';

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;

export const Diary = ({
  event, user, optionsUser, listTags
}) => {

  const [agendars, setAgendars] = useState(event?.Angendars ?? []);
  const handleAddTask = (agendar, index) => {
    const newAgendars = [...agendars];
    newAgendars[index].newTask = {
      content: '',
      assignee: [],
      deadline: ''
    };
    setAgendars(newAgendars);
  }

  const onChangeNewTask = (value, index, field) => {
    const newAgendars = [...agendars];
    newAgendars[index].newTask[field] = value;
    setAgendars(newAgendars);
  }

  const handleEditTask = async (i, index) => {
    const { AgendarId, Assignee, Content, Deadline, EventId, Id } = agendars[index].checklists[i];
    const assignee = Assignee.map(item => item.Id ?? + item);
    const res = await API.event.updateSubtask({
      eventId: EventId,
      agendarId: AgendarId,
      id: Id,
      content: Content,
      assignee,
      deadline: moment(Deadline).format('YYYY/MM/DD')
    });
    if (res.code === 200) {
      const newAgendars = [...agendars];
      const newAssignees = listTags.filter(item => assignee.includes(+item.Id))
      newAgendars[index].checklists[i] = {
        Id: AgendarId,
        EventId: EventId,
        Assignee: newAssignees,
        Content: Content,
        Deadline: Deadline,
        edit: false
      };
      setAgendars(newAgendars);
    }
  }

  const onChangeEditTask = (value, i, index, field) => {
    const newAgendars = [...agendars];
    newAgendars[index].checklists[i][field] = value;
    setAgendars(newAgendars);
  }

  const handleSubmitTask = (index) => {
    const { content, assignee, deadline } = agendars[index].newTask;
    if (content && assignee && deadline) {
      const eventId = agendars[index].EventId;
      const agendarId = agendars[index].Id;
      API.event.createSubtask({
        eventId,
        agendarId,
        content,
        assignee : assignee.map(item => + item),
        deadline: moment(deadline).format('YYYY/MM/DD')
      }).then(res => {
        if (res.code === 200) {
          const newAgendars = [...agendars];
          const newAssignees = listTags.filter(item => assignee.includes(item.Id))
          newAgendars[index].checklists.push({
            Id: agendarId,
            EventId: eventId,
            Assignee: newAssignees,
            Content: content,
            Deadline: deadline
          });
          delete newAgendars[index].newTask;
          setAgendars(newAgendars);
        }
      }).catch(err => console.log(err))
    }
  }

  const handleCreateDiary = (agendar, index) => {
    if (agendar.newInputDiary) {
      const newInputDiary = agendar.newInputDiary;
      const eventId = agendar.EventId;
      const agendarId = agendar.Id;
      const description = agendar.Description ? [...agendar.Description] : [];
      description.unshift(newInputDiary);
      API.event.updateDiary({
        id: agendarId,
        eventId,
        description
      }).then(res => {
        if (res.code === 200) {
          const newAgendars = [...agendars];
          newAgendars[index].Description = description;
          setAgendars(newAgendars);
          handleCancelDiary(index);
        }
      }).catch(err => console.log(err))
    }
  }

  const handleCancelDiary = (index) => {
    const newAgendars = [...agendars];
    newAgendars[index].newInputDiary = '';
    setAgendars(newAgendars);
  }

  const handleCancelDescription = (i, index) => {
    const newAgendars = [...agendars];
    newAgendars[index].Description[i] = newAgendars[index].Description[i].oldDescription;
    setAgendars(newAgendars);
  }

  const handleUpdateDescription = (agendar, i, index) => {
    const oldDescription = agendar.Description[i].oldDescription;
    const description = agendar.Description[i].description;
    if (description !== oldDescription) {
      const eventId = agendar.EventId;
      const agendarId = agendar.Id;
      const newAgendars = [...agendars];
      newAgendars[index].Description = newAgendars[index].Description.map(item => item.description ?? item);
      setAgendars(newAgendars);
      API.event.updateDiary({
        id: agendarId,
        eventId,
        description: newAgendars[index].Description
      });
    }
  }

  const handleEditDescription = (i, index) => {
    const newAgendars = [...agendars];
    newAgendars[index].Description[i] = {
      description: newAgendars[index].Description[i],
      oldDescription: newAgendars[index].Description[i],
      edit: true
    };
    setAgendars(newAgendars);
  }

  const handleEditSubtask = (i, index) => {
    const newAgendars = [...agendars];
    newAgendars[index].checklists[i].edit = true;
    setAgendars(newAgendars);
  }

  const handleDeleteSubtask = (item, i, index) => {
    API.event.deleteSubtask({
      eventId: item.EventId,
      agendarId: item.AgendarId,
      subId: item.Id
    }).then(res => {
      if (res.code === 200) {
        const newAgendars = [...agendars];
        delete newAgendars[index].checklists[i];
        setAgendars(newAgendars);
      }
    }).catch(err => console.log(err))
  }

  const handleDeleteDescription = (i, index) => {
    const description = agendars[index].Description ? [...agendars[index].Description] : [];
    description.splice(i, 1);
    API.event.updateDiary({
      id: agendars[index].Id,
      eventId: agendars[index].EventId,
      description
    }).then(res => {
      if (res.code === 200) {
        const newAgendars = [...agendars];
        newAgendars[index].Description = description;
        setAgendars(newAgendars);
        handleCancelDiary(index);
      }
    }).catch(err => console.log(err))
  }

  const renderContent = useCallback((agendar, index) => (
    <div className="Diary__collapse-panel-content">
      {/* <TextArea
        rows={5}
        placeholder="Viết nhật ký"
      /> */}
      <div
        style={{
          margin: "0px 5px",
          border: "1px solid rgba(39, 39, 39, 0.2)",
        }}
      >
        <CKEditor
          className="editor-container"
          editor={ClassicEditor}
          data={agendar.newInputDiary ?? ""}
          config={{
            placeholder: "Viết nhật ký",
            toolbar: ["heading", "|", "bold", "italic", "link", "|", "bulletedList", "numberedList", "|", "insertTable", "blockQuote", "|", "undo", "redo"],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Normal",
                  class: "ck-heading_normal",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
          }}
        onChange={(event, editor) => {
          const newAgendars = [...agendars];
          newAgendars[index].newInputDiary = editor.getData();
          setAgendars(newAgendars);
        }}
        />
      </div>
      <div
        className="editor-comment__footer"
        style={{ marginLeft: 0, padding: "0px 4px" }}
      >
        <div className="editor-comment__footer-left">
          <div>
            <label
              // htmlFor={post.Id + "InputComment"}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "30px",
              }}
            >
              <Tooltip
                placement="top"
                title="Ảnh/Video"
                className="emoji-control"
              >
                <img
                  src={ImageIcon}
                  alt="imageIcon"
                  style={{ margin: 0 }}
                // className={`cursor--pointer select-icon icon-comment ${
                //   isFocusComment ? "select-icon-new" : ""
                // }`}
                />
                {/* Ảnh/Video */}
              </Tooltip>
            </label>
            <input
              // key={keyCommentFile}
              type="file"
              name="image"
              // id={post.Id + "InputComment"}
              hidden={true}
              multiple
            // onChange={handleUploadImages}
            />
          </div>

          <div>
            <label
              // htmlFor={post.Id + "AttachComment"}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "30px",
              }}
            >
              <Tooltip
                placement="top"
                title="Đính kèm file"
                className="emoji-control"
              >
                <img
                  src={ToolAttachIcon}
                  alt="imageIcon"
                  style={{ margin: 0 }}
                // className={`cursor--pointer select-icon icon-comment ${
                //   isFocusComment ? "select-icon-new" : ""
                // }`}
                />
                {/* Đính kèm */}
              </Tooltip>
            </label>
            <input
              // key={keyCommentFile}
              type="file"
              name="fileInput"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              // id={post.Id + "AttachComment"}
              hidden
              multiple
            // onChange={uploadFile}
            />
          </div>
        </div>
        <div className="controls">
          <Button
            type="link"
            size="small"
            style={{
              fontSize: 14,
              height: "20px",
              lineHeight: "16.1px",
              color: "#272727",
              opacity: 0.5,
            }}
            onClick={() => handleCancelDiary(index)}
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            size="small"
            style={{
              fontSize: 14,
              height: "20px",
              lineHeight: "16.1px",
              backgroundColor: "#32A1C8",
            }}
          onClick={() => handleCreateDiary(agendar, index)}
          >
            Cập nhật
          </Button>
        </div>
      </div>
      <Card className='card-diary-description'>
        {agendar.Description?.map((item, i) => (
          <Row className='diary-description' key={i}>
            {item.edit ? (
              <>
                <Col span={24}>
                  <div
                    style={{
                      margin: "0px 5px",
                      border: "1px solid rgba(39, 39, 39, 0.2)",
                    }}
                  >
                    <CKEditor
                      className="editor-container"
                      editor={ClassicEditor}
                      data={item.description ?? ""}
                      config={{
                        placeholder: "Viết nhật ký",
                        toolbar: ["heading", "|", "bold", "italic", "link", "|", "bulletedList", "numberedList", "|", "insertTable", "blockQuote", "|", "undo", "redo"],
                        heading: {
                          options: [
                            {
                              model: "paragraph",
                              title: "Normal",
                              class: "ck-heading_normal",
                            },
                            {
                              model: "heading1",
                              view: "h1",
                              title: "Heading 1",
                              class: "ck-heading_heading1",
                            },
                            {
                              model: "heading2",
                              view: "h2",
                              title: "Heading 2",
                              class: "ck-heading_heading2",
                            },
                            {
                              model: "heading3",
                              view: "h3",
                              title: "Heading 3",
                              class: "ck-heading_heading3",
                            },
                          ],
                        },
                      }}
                    onChange={(event, editor) => {
                      const newAgendars = [...agendars];
                      newAgendars[index].Description[i].description = editor.getData();
                      setAgendars(newAgendars);
                    }}
                    />
                  </div>
                  <div
                    className="editor-comment__footer"
                    style={{ marginLeft: 0, padding: "0px 4px" }}
                  >
                    <div className="editor-comment__footer-left">
                      <div>
                        <label
                          // htmlFor={post.Id + "InputComment"}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            width: "30px",
                          }}
                        >
                          <Tooltip
                            placement="top"
                            title="Ảnh/Video"
                            className="emoji-control"
                          >
                            <img
                              src={ImageIcon}
                              alt="imageIcon"
                              style={{ margin: 0 }}
                            // className={`cursor--pointer select-icon icon-comment ${
                            //   isFocusComment ? "select-icon-new" : ""
                            // }`}
                            />
                            {/* Ảnh/Video */}
                          </Tooltip>
                        </label>
                        <input
                          // key={keyCommentFile}
                          type="file"
                          name="image"
                          // id={post.Id + "InputComment"}
                          hidden={true}
                          multiple
                        // onChange={handleUploadImages}
                        />
                      </div>

                      <div>
                        <label
                          // htmlFor={post.Id + "AttachComment"}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            width: "30px",
                          }}
                        >
                          <Tooltip
                            placement="top"
                            title="Đính kèm file"
                            className="emoji-control"
                          >
                            <img
                              src={ToolAttachIcon}
                              alt="imageIcon"
                              style={{ margin: 0 }}
                            // className={`cursor--pointer select-icon icon-comment ${
                            //   isFocusComment ? "select-icon-new" : ""
                            // }`}
                            />
                            {/* Đính kèm */}
                          </Tooltip>
                        </label>
                        <input
                          // key={keyCommentFile}
                          type="file"
                          name="fileInput"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          // id={post.Id + "AttachComment"}
                          hidden
                          multiple
                        // onChange={uploadFile}
                        />
                      </div>
                    </div>
                    <div className="controls">
                      <Button
                        type="link"
                        size="small"
                        style={{
                          fontSize: 14,
                          height: "20px",
                          lineHeight: "16.1px",
                          color: "#272727",
                          opacity: 0.5,
                        }}
                        onClick={() => handleCancelDescription(i, index)}
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        style={{
                          fontSize: 14,
                          height: "20px",
                          lineHeight: "16.1px",
                          backgroundColor: "#32A1C8",
                        }}
                      onClick={() => handleUpdateDescription(agendar, i, index)}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col dangerouslySetInnerHTML={{__html: item}} className='detail-description' span={23} />
                <Col span={1}>
                  <img 
                    src={EditIcon} 
                    alt='EditIcon' 
                    onClick={() => handleEditDescription(i, index)} 
                    className='edit-description-icon'
                  />
                  <img 
                    src={DeleteIcon} 
                    alt='DeleteIcon' 
                    onClick={() => handleDeleteDescription(i, index)} 
                    className='delete-description-icon'
                  />
                </Col>
              </>
            )}
          </Row>
        ))}
      </Card>
      <Card className="Diary__collapse-panel-content-cardContainer">
        {agendar.checklists.map((item, i) => (
          <>
            <div className="Diary__collapse-panel-content-card">
              <Col span={12}>
                {item.edit ? (
                  <AutoResizeTextBox
                    className="one-row agendar-input-content"
                    value={item.Content}
                    placeholder="Tên task/ Checklist to do"
                    onChange={(e) => onChangeEditTask(e.target.value, i, index, 'Content')}
                  ></AutoResizeTextBox>
                ) : (
                  <>
                    <b>Task {i + 1}: </b> {item.Content}
                  </>
                )}
              </Col>

              <Col span={5}>
                {item.edit ? (
                  <div className='extend-event-multi-select'>
                    <Select
                      mode="multiple"
                      bordered
                      className="select"
                      value={item.Assignee.map(item => item.Id ? JSON.stringify(item.Id) : item)}
                      onChange={e => onChangeEditTask(e, i, index, 'Assignee')}
                      style={{ width: '100%' }}
                      placeholder={<img src={AddUserIcon} />}
                    >
                      {optionsUser}
                    </Select>
                  </div>
                ) : (
                  <>
                    Assignee:{' '}
                    {item.Assignee.map(assignee => (
                      <>
                        <Space>
                          <AvatarCustom
                            size={16}
                            src={assignee.Avatar ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&fit=inside&image_id=${assignee.Avatar}` : ''}
                            fullName={assignee.FullName ?? ''}
                          />
                          <b style={{ whiteSpace: 'nowrap' }}>{assignee.FullName ?? ''}</b>
                        </Space>
                      </>
                    ))}
                  </>
                )}
              </Col>
              <Col span={4}>
                {item.edit ? (
                  <DatePicker
                    className='date-picker'
                    format={'DD/MM/YYYY'}
                    disabledDate={current => {
                      return moment().add(-1, 'days') >= current;
                    }}
                    suffixIcon={false}
                    placeholder={'--/--/--'}
                    value={item.Deadline ? moment(item.Deadline) : null}
                    onChange={date => onChangeEditTask(date, i, index, 'Deadline')}
                  />
                ) : (
                  <>
                    Deadline: <b>{item.Deadline ? moment(item.Deadline).format('DD/MM/YYYY') : ''}</b>
                  </>
                )}
              </Col>
              <Col span={1}>
                {item.edit ? (
                  <Tooltip title="Lưu">
                    <img 
                      src={Icons.check} 
                      className="iconEdit agendar-image-button" 
                      onClick={() => handleEditTask(i, index)} 
                    />
                  </Tooltip>
                ) : (
                  <>
                    <img 
                      src={EditIcon} 
                      alt='EditIcon' 
                      onClick={() => handleEditSubtask(i, index)} 
                      style={{ cursor: 'pointer', position: 'absolute', left: 0, top: '2px' }}
                    />
                    <img 
                      src={DeleteIcon} 
                      alt='DeleteIcon' 
                      onClick={() => handleDeleteSubtask(item, i, index)} 
                      style={{ cursor: 'pointer', position: 'absolute', right: 0 }}
                    />
                  </>
                )}
              </Col>
            </div>
          </>
        ))}
        {agendar.newTask ? (
          <>
            <div className="Diary__collapse-panel-content-card">
              <Col span={12}>
                <AutoResizeTextBox
                  className="one-row agendar-input-content"
                  value={agendar.newTask.content}
                  placeholder="Tên task/ Checklist to do"
                  onChange={(e) => onChangeNewTask(e.target.value, index, 'content')}
                ></AutoResizeTextBox>
              </Col>

              <Col span={5}>
                <div className='extend-event-multi-select'>
                  <Select
                    mode="multiple"
                    bordered
                    className="select"
                    value={agendar.newTask.assignee}
                    onChange={e => onChangeNewTask(e, index, 'assignee')}
                    style={{ width: '100%' }}
                    placeholder={<img src={AddUserIcon} />}
                  >
                    {optionsUser}
                  </Select>
                </div>
              </Col>

              <Col span={4}>
                <DatePicker
                  className='date-picker'
                  format={'DD/MM/YYYY'}
                  disabledDate={current => {
                    return moment().add(-1, 'days') >= current;
                  }}
                  suffixIcon={false}
                  placeholder={'--/--/--'}
                  value={agendar.newTask.deadline ? moment(agendar.newTask.deadline, 'DD/MM/YYYY') : null}
                  onChange={date => onChangeNewTask(date, index, 'deadline')}
                />
              </Col>

              <Col span={1}>
                <Tooltip title="Lưu">
                  <img 
                    src={Icons.check} 
                    className="iconEdit agendar-image-button" 
                    onClick={() => handleSubmitTask(index)} 
                  />
                </Tooltip>
              </Col>
            </div>
          </>
        ) : false}
        <Button
          type="link"
          style={{ color: Colors.pelorous }}
          onClick={() => handleAddTask(agendar, index)}
        >
          + Add task / Add Checklist to do
        </Button>
      </Card>
    </div>
  ), [])

  return (
    <Card className="Diary">
      <Title level={5}>Chi tiết nhật ký sự kiện</Title>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        className="Diary__collapse"
        expandIcon={({ isActive }) => <img src={isActive ? Icons.dropdownActive : Icons.dropdown} width={18} height={18} />}
      >
        {/* <Panel header="This is panel header 1" key="1" className="Diary__collapse-panel">
          {renderContent(1)}
        </Panel>
        <Panel header="This is panel header 2" key="2" className="Diary__collapse-panel">
          {renderContent(2)}
        </Panel>
        <Panel header="This is panel header 3" key="3" className="Diary__collapse-panel">
          {renderContent(3)}
        </Panel> */}

        {agendars.map((agendar, index) => (
          <Panel header={agendar.Content} key={agendar.Id} className="Diary__collapse-panel">
            {renderContent(agendar, index)}
          </Panel>
        ))}
      </Collapse>
    </Card>
  )
}

Diary.propTypes = {
  event: PropTypes.object,
  optionsUser: PropTypes.object,
  listTags: PropTypes.object,
  onUploadImages: PropTypes.func,
  onUploadFile: PropTypes.func,
  user: PropTypes.object
}
