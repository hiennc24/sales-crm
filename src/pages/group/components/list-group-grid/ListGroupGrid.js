import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Menu, Dropdown, Button } from "antd";
// import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { selectListGroup, selectLoading } from "../../Group.selector";
import BoxLoading from "../../../../components/box-loading/BoxLoading";
// import { Scrollbars } from 'react-custom-scrollbars';
import "./ListGroupGrid.scss";
import { selectGroupType } from "../../../../stores/global/global.selector";

const { Paragraph } = Typography;

import RecentImage from "../../../../assets/images/recent-image.svg";
import AddGroup from "../../../../assets/images/avatar-add-group.jpg"
import Group from "../../../../assets/images/group.png"
import moreIcon from "../../../../assets/images/groups/more.png"
import publicGroup from "../../../../assets/images/groups/publicGroup.png"
import privateGroup from "../../../../assets/images/groups/privateGroup.png"
import noTaskImg from "../../../../assets/images/no-task-img.svg";
import ModalDeleteGroup from "../modal-confirm-delete/ModalConfirmDelete";
import { getUrlImage } from "../../../../utils";
import { reloadListGroup, clearListGroup } from "../../Group.action";
import ModalCreateGroup from "../../../../components/modal-create-group/ModalCreateGroup";
import Skeleton from './Skeleton';
import EmptyData from '../../../social/components/detail-posts/post/EmptyData';

const ListGroupGrid = () => {
	const listGroups = useSelector(selectListGroup());
	const groupType = useSelector(selectGroupType());
	const isLoading = useSelector(selectLoading());
	const [isShowConfirm, toggleShowConfirm] = useState(false);
	const [groupIdSelected, selectGroupId] = useState();
	const [isShowCreate, toggleShowCreate] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {

		return () => {
			clearListGroup()
		}
	}, [])

	const user = useSelector((state) => state.get("userProfile").get("profile"));
	const refeshDataDelete = () => {
		var list = listGroups.filter((item) => groupIdSelected !== item.Id);
		dispatch(reloadListGroup(list));
	};

	const menu = (id) => (
		<Menu>
			<Menu.Item
				onClick={() => {
					toggleShowConfirm(true);
					selectGroupId(id);
				}}
			>
				Xóa nhóm
			</Menu.Item>
		</Menu>
	);

	const renderMembersShort = (item) => {
		let Employees = item.Employee;
		Employees = Employees.concat(item.AccountManager);
		var listView = [];
		if (Employees) {
			Employees.map((item, index) => {
				var avatar =
					item.Avatar && item.Avatar !== ""
						? getUrlImage(35, 35, item.Avatar)
						: RecentImage;
				if (Employees.length === index + 1) {
					listView.push(
						<img
							className="avt-member avt-first"
							src={avatar}
							alt="recent"
							title={item.FullName}
							key={index}
						/>
					);
				} else {
					listView.push(
						<img
							className="avt-member"
							src={avatar}
							alt="recent"
							title={item.FullName}
							key={index}
						/>
					);
				}
			});
		}
		return listView;
	};

	const convertGroupType = (type) => {
		const group = groupType?.find((group) => group.Code === type);
		return group?.Name || type;
	};

	const refeshDataAdd = () => {
		dispatch(clearListGroup());
	};

	return (
		<>
			{/* <Scrollbars autoHide autoHeightMin={0} autoHeightMax={'inherit'}> */}
			<Row gutter={26} className="recent-news-list">
				<Col xs={24} sm={12} md={12} lg={8} xxl={6} className="recent-news-item-large">
					<div className="item-content-wrapper add-group-button" onClick={() => toggleShowCreate(true)} style={{ cursor: 'pointer' }}>
						<div className="add-group">
							<img
								className='image-group'
								draggable={false}
								src={Group}
							/>
						</div>
						<h4 className="add-group add-group-title">
							Tạo nhóm mới
						</h4>
						<p className="add-group add-group-text">
							Hãy tạo nhóm mới để kết nối
						</p>
						<div className="group-add-content">
							<Button
								className='btn-add-group-work'
								size="small"
							// icon={<PlusCircleOutlined />}
							>
								Tạo nhóm
							</Button>
						</div>
					</div>
				</Col>
				{listGroups.length > 0 && listGroups.map((item, key) => (
					<Col xs={24} sm={12} md={12} lg={8} xxl={6} className="recent-news-item-large" key={key}>
						<div className="item-content-wrapper">
							<img
								className="group-avatar"
								draggable={false}
								src={
									item.Avatar && item.Avatar !== ""
										? getUrlImage(300, 175, item.Avatar)
										: AddGroup
								}
							/>
							{user.Id === item.Admin && (
								<div className="recent-news-action">
									<Dropdown overlay={() => menu(item.Id)}>
										<a
											className="btn-more-square"
											onClick={(e) => e.preventDefault()}
										>
											<img src={moreIcon} alt='moreIcon' />
										</a>
									</Dropdown>
								</div>
							)}
							<Row className="item-content">
								<Col span={24}>
									{/* <a href={"/income/group-work/" + item.Id}> */}
										<div className="recent-news-info ml--5" onClick={()=> {history.push('/group-work/' + item.Id)}}>
											<Row justify="space-between" align="middle">
												<Col span={24}>
													<Typography.Paragraph ellipsis className="group-type mb--0">
														<img
															className='group-type-icon'
															src={item.GroupTypeCode === 'public' ? publicGroup : privateGroup}
															alt='groupType' />
														{convertGroupType(item.GroupTypeCode)}
													</Typography.Paragraph>
												</Col>
											</Row>
											<Typography.Paragraph ellipsis className="group-name mb--0">{item.Name}</Typography.Paragraph>
											<Paragraph
												ellipsis={{ rows: 2, expandable: false, symbol: "" }}
												className="text-description-group mb--0"
											>
												{/* {item.Desc} */}
												<p
													dangerouslySetInnerHTML={{
														__html: item.Desc?.replaceAll("\n", "<br/>").split('<p>&nbsp;</p>').join(''),
													}}
												></p>
											</Paragraph>
											{/* <p className="truncate">Cập nhật 1 giờ trước</p> */}
											<div className="list-avt-member">
												<div className="content-avt">
													{renderMembersShort(item)}
												</div>
												<p className="text-count-member ml--5">
													{(item.Employee ? item.Employee.length : 0) + 1} thành viên
												</p>
											</div>
											<div className="text-detail">
												<a>Chi tiết &gt;</a>
											</div>
										</div>
									{/* </a> */}
								</Col>
							</Row>
						</div>
					</Col>
				))}
				{isLoading && listGroups.length === 0 && (
					// <div className="loading">
					// 	<BoxLoading />
					// </div>
					<Col xs={24} sm={12} md={12} lg={8} xxl={6} className="recent-news-item-large">
						<Skeleton />
					</Col>
				)}
				{!isLoading && listGroups.length === 0 && (
					<div>
						<EmptyData type={'group'} />
					</div>
				)}
				<ModalDeleteGroup
					isShow={isShowConfirm}
					onToggle={() => toggleShowConfirm(false)}
					groupId={groupIdSelected}
					refeshData={refeshDataDelete}
				/>
			</Row>
			{/* </Scrollbars> */}
			{
				isShowCreate &&
				<ModalCreateGroup
					isShow={isShowCreate}
					onToggle={() => toggleShowCreate(false)}
					refeshData={refeshDataAdd}
					user={user}
				/>
			}
		</>
	);
};

ListGroupGrid.propTypes = {};

export default ListGroupGrid;
