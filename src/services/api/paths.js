export const paths = {
  login() {
    return `/login`;
  },
  getUserOutside() {
    return `/accounts`;
  },
  //handle account
  getUserProfile() {
    return `/accounts/profile`;
  },
  getOtherUserProfile(id) {
    return `/accounts/profile?userId=${id}`;
  },
  updateProfile() {
    return `/accounts`;
  },
  resetUserPassword() {
    return `/accounts/changepass`;
  },
  updateStatus() {
    return `/accounts/status`;
  },
  updateInfor() {
    return `/accounts/infor`;
  },
  updateJob() {
    return `/accounts/job`;
  },
  changeAvatar() {
    return `/accounts/avatar`;
  },
  changeCover() {
    return `/accounts/cover`;
  },
  getImageByUserId({ userId, index, pageSize }) {
    return `/accounts/images?userId=${userId}&index=${index}&pageSize=${pageSize}`;
  },
  //social
  loginSocical() {
    return `/auth/loginsocial`;
  },
  listCompany() {
    return `/company`;
  },
  createCompany() {
    return `/company/create`;
  },
  getUser(id) {
    return `/user/${id}`;
  },
  register() {
    return `/accounts/register`;
  },
  loginCompany() {
    return `/auth/company`;
  },
  resetPass() {
    return `/accounts/confirm-recover-password`;
  },
  forgotPass() {
    return "/accounts/forgotpassword";
  },
  getListLanguage() {
    return "/languages/list/client";
  },
  changeLanguage() {
    return `languages/change`;
  },
  getListGroup({ keySearch, index, pageSize }) {
    return `/groups/joined?name=${keySearch}&index=${index}&pageSize=${pageSize}`;
  },
  getAllGroup() {
    return `/groups?index=1&pageSize=1000`;
  },
  createGroup() {
    return "/groups";
  },
  editGroup(id) {
    return "/groups/" + id;
  },

  //chat
  createChat() {
    return `/chat`;
  },
  updateChat() {
    return `/chat`;
  },
  updateChatReact() {
    return `/chat/emoji`;
  },
  deleteChat() {
    return `/chat/delete`;
  },
  deleteConversation(id) {
    return `/conversation/${id}`;
  },
  viewLastMemberChat(id) {
    return `/chat/${id}`;
  },
  getListConversation() {
    return `/conversation`;
  },
  getFile(id) {
    return `/conversation/file/${id}`;
  },
  getListGroupConversation() {
    return `/conversation?isGroup=true`;
  },
  createConversation() {
    return `/conversation`;
  },
  createSingleConversation() {
    return `/conversation/create-single`;
  },
  detailConversation(id) {
    return `/conversation/${id}`;
  },
  updateNameGroupChat(id) {
    return `/conversation/${id}`;
  },
  updateNotify() {
    return `/conversation/notify`;
  },
  addMember() {
    return `/conversation/add-members`;
  },
  verifyMember() {
    return `/conversation/verify-member`;
  },
  leaveConversation() {
    return `/conversation/leave`;
  },
  removeMember() {
    return `/conversation/remove-member`;
  },
  searchConversationsByName(name) {
    return `/conversation/search?page=1&limit=&name=${name}`;
  },
  searchMessage(id, key, index, pageSize) {
    return `/conversation/search/${id}?pageSize=${pageSize}&index=${index}&key=${key}`;
  },
  getMessageRange(conservationId, chatId, number) {
    return `/conversation/${conservationId}/${chatId}?&number=${number}`;
  },
  // group
  searchListGroup(keySearch, page, size) {
    return `/groups?name=${keySearch}&index=${page}&pageSize=${size}`;
  },
  getGroupDetail(id) {
    return "/groups/detail?groupId=" + id;
  },
  listEmployees() {
    return "/employee";
  },
  listEmployeesSuggestGroup(id) {
    return `/groups/employee-not-exist?name=&groupId=${id}`;
  },
  deleteGroup(id) {
    return "/groups/delete/" + id;
  },
  removeGroupMember() {
    return "/groups/employee";
  },
  getGroupType(langId) {
    return "/groups/type?languageId=" + langId + "&type=1";
  },
  requestJoinGroup() {
    return "/groups/join-group";
  },
  outGroup() {
    return "groups/leave";
  },
  getListPostsGroup(groupId, type, page, pageSize) {
    return `/posts?groupId=${groupId}&index=${page}&pageSize=${pageSize}&type=${type}`;
  },
  getListImage(groupId, page, pageSize) {
    return `groups/images?groupId=${groupId}&index=${page}&pageSize=${pageSize}`;
  },

  updateStatusTypePriority() {
    return `/posts/priority`;
  },

  getSettings() {
    return "/accounts/setting";
  },
  updateSetting() {
    return "/accounts/setting";
  },
  getListPosts(groupId, index, pageSize, type) {
    return `/posts?groupId=${groupId}&index=${index}&pageSize=${pageSize}&type=${type}`;
  },
  getListPostsPriority(groupId, type, priority, index, pageSize) {
    return `/posts/priority?groupId=${groupId}&index=${index}&pageSize=${pageSize}&type=${type}&priority=${priority}`;
  },
  getPost(id) {
    return `/posts/detail/${id}`;
  },
  getPostEvent(id) {
    return `/event/detail/${id}`;
  },
  deleteEvent(id) {
    return `/event/${id}`;
  },
  getListPlace() {
    return `/event/place`;
  },
  createAgendar() {
    return `/event/create-agendar`;
  },
  updateAgendar() {
    return `/event/update-agendar`;
  },
  deleteAgendar() {
    return `/event/agendar`;
  },
  deleteSubtask() {
    return `/event/subtask`;
  },
  deleteParticipant() {
    return `/event/participants`;
  },
  inviteEvent() {
    return `/event/invite-event`;
  },
  createSubtask() {
    return `/event/create-subtask`;
  },
  updateSubtask() {
    return `/event/update-subtask`;
  },
  updateDiary() {
    return `/event/update-diary`;
  },
  getComment(id, index, size) {
    return `/posts/comments?parentId=${id}&index=${index}&pageSize=${size}`;
  },
  getCommentPaging(id, pageIndex, pageSize) {
    return `/posts/comments?parentId=${id}&index=${pageIndex}&pageSize=${pageSize}`;
  },
  createPost() {
    return `/posts/create`;
  },
  pinPost() {
    return `/posts/pin`;
  },
  reactPost() {
    return `/posts/action`;
  },
  uploadFile(type) {
    return `https://filemanager.crmdemo.net/file/upload/${type}`;
  },
  editPost() {
    return `/posts/edit`;
  },
  createComment() {
    return `/posts/comment`;
  },
  getEmployeeByName(name) {
    return `/employee/search?name=${name}`;
  },
  createEvent() {
    return `/event/create`;
  },
  editEvent(id) {
    return `/event/${id}`;
  },

  // search
  getListSearch(key, page, size, groupName, type, groupId = 0) {
    return `posts/search?groupId=${groupId}&index=${page}&pageSize=${size}&key=${key}${groupName ? `&g=${groupName}` : ""
      }${type ? `&type=${type}` : ""}`;
  },
  getListGroupSearch(key, groupId, page, size) {
    return `posts/search?groupId=${+groupId}&index=${page}&pageSize=${size}&key=${key}`;
  },
  createVote() {
    return `/posts/vote-v3`;
  },
  updateVote() {
    return `/posts/vote-v3`;
  },
  voteAnswer() {
    return `/posts/vote-answer`;
  },
  sendInviteEmail() {
    return "/company/invite";
  },
  verifyInvite() {
    return "company/verify";
  },
  confirmInvite() {
    return "company/confirm";
  },
  getInviteLink() {
    return "/company/invite-link";
  },
  verifyLink() {
    return "company/confirm-link";
  },
  confirmLink() {
    return "/accounts/create-user-company";
  },
  saveUserImage() {
    return `/uploads`;
  },
  savePostsHistory() {
    return `/posts/save`;
  },
  deletePost(id) {
    return `/posts/delete/${id}`;
  },
  getListUserRequestGroup({ groupId }) {
    return `/groups/list-request/${groupId}`;
  },
  memberApproveJoinGroup() {
    return `/groups/member-approve`;
  },
  approveUserRequestGroup() {
    return `/groups/admin-approve`;
  },
  getListUserInviteGroup({ groupId, name }) {
    return `/groups/employee-not-exist?name=${name}&groupId=${groupId}`;
  },
  submitListUserInviteGroup() {
    return `/groups/add-member`;
  },
  getListPostInUserProfile(groupId, index, pageSize, userId, type, key) {
    return `/posts/profile?groupId=${groupId}&index=${index}&pageSize=${pageSize}&userId=${userId}&type=${type}&key=${key}`;
  },
  addAnswer() {
    return `/posts/vote-answer/add`;
  },
  removeAnswer() {
    return `/posts/vote-answer/remove`;
  },
  notification() {
    return `/noti?index=1&pageSize=100`;
  },
  seenNoti() {
    return `/noti`;
  },
  toggleJoinEvent() {
    return `/event/join-event`;
  },

  // event
  getListEventByTime(key, groupId, index, pageSize, type, option) {
    return `/event/get-time?key=${key}&option=${option}&index=${index}&pageSize=${pageSize}&groupId=${groupId}&type=${type}`;
  },

  userJoinEvent() {
    return `/event/join-event`;
  },
  userConsiderEvent() {
    return `/posts/action`;
  },
};
