// Comment
/* <Divider className="space-divider" />
                  <div className="post-footer">
                    <div>
                      <p>
                        <b>Bình luận</b>
                      </p>
                    </div>
                    {event.comments && event.comments.length > 0 ? (
                      <PostComments
                        comments={event.comments}
                        post={event}
                      />
                    ) : event?.CountComment > 0 ? (
                      <PostComments
                        comments={event.comments}
                        post={event}
                      />
                    ) : (
                      <></>
                    )}
                    <InputComment createComment={handlePushComment} post={event} />
                  </div> */


//Detail tab

{/* <Row className="item-event-detail">
                          <Col span={24}>
                            <p className="title-content m--0">Các hình ảnh khác</p>
                          </Col>
                        </Row>
                        {event && event.Files && event.Files.length > 0 && <Row className="item-event-detail">
                          <Image.PreviewGroup>
                            {event?.Files.filter((r, index) => r.Type === 1 && index > 0).map((r, index) => (
                              <Col key={index} span={6}>
                                <Image width="100%" height="200px" src={getUrlImage(0, 0, r.Files)} />
                              </Col>
                            ))}
                          </Image.PreviewGroup>
                        </Row>}
                        <Divider className="space-divider" />
                        {event?.DocFile && event?.DocFile.length > 0 && (
                          <>
                            <Row className="item-event-detail">
                              <Col span={3}>
                                <p className="title-content">Tài liệu</p>
                              </Col>
                              <Col span={20}>
                                <div className="doc-right-content">
                                  <Row>
                                    {event?.DocFile?.map((f, index) => (
                                      <Col key={index} span={12}>
                                        <div className="doc-right-content-item">
                                          <img src={getIcon(f)} alt="" />
                                          <div className="doc-right-content-right">
                                            <p>{getName(f)}</p>
                                            <a href={getUrl(f)}
                                              target={"_blank"}
                                              rel="noreferrer">Download File</a>
                                          </div>
                                        </div>
                                      </Col>
                                    ))}
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                            <Divider className="space-divider" />
                          </>
                        )} */}

 {/* <div
                        className="expandabled-event"
                        onClick={() => setIsExtend(!isExtend)}
                      >
                        <p className="expanded-text">
                          {!isExtend ? "Mở rộng" : "Thu gọn"}
                        </p>
                        {!isExtend ? (
                          <CaretDownOutlined />
                        ) : (
                          <CaretUpOutlined />
                        )}
                      </div> */}
      {/* {isExtend && (
                        <div className="info-bonus">
                          <h5 className="title-bonus">Thông tin bổ sung</h5>
                          <FormatText3
                            content={event?.Details?.Additional}
                          ></FormatText3>
                        </div>
                      )} */}



