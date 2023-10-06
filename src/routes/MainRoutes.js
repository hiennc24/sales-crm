import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import SocialScreen from "../pages/social/Social";
import AboutScreen from "../pages/about/About";
import TermsScreen from "../pages/terms/Terms";
import SettingScreen from "../pages/setting/Setting";
import UserProfileScreen from "../pages/user-profile/UserProfile";
import { MessageBox } from "../pages/social/components/messages/message-box";
import PAGES from "./constants";
import GroupWorkScreen from "../pages/group/GroupWork";
import GroupWorkDetail from "../pages/group/GroupWorkDetail";
import SearchPage from "../pages/search";
import EditProfile from "../pages/user-profile/component/edit-profile/EditProfile";
import PostDetail from "../pages/post-detail/PostDetail";
import InviteAccount from "../pages/invite-account/index";
import SearchInGroup from "../pages/group/components/list-search";
import Notifications from "../pages/list-notification/ListNotification";
import EventsList from "../pages/events/EventsList";
import EventDetail from "../pages/event-detail/EventDetail";
import Calendar from "../pages/calendar";

export const MainRoutes = () => {
  const [cookies] = useCookies(["abizin_token"]);

  // React.useEffect(() => {
  //   if (!cookies.abizin_token) {
  //     window.location = process.env.REACT_APP_HOST_SITE;
  //   }
  // }, [cookies.abizin_token]);

  return (
    <Switch>
      <Route path={PAGES.home} component={SocialScreen} exact />
      <Route path={PAGES.messagesBox} component={MessageBox} exact />
      <Route path={PAGES.about} component={AboutScreen} exact />
      <Route path={PAGES.eventDetail} component={EventDetail} exact />
      <Route path={PAGES.event} component={EventsList} exact />
      <Route path={PAGES.eventEdit} component={EventsList} exact />
      <Route path={PAGES.groupWork} component={GroupWorkScreen} exact />
      <Route path={PAGES.calendar} component={Calendar} exact />
      <Route path={PAGES.inviteAccount} component={InviteAccount} exact />
      <Route path={PAGES.groupSearch} component={SearchInGroup} exact />
      <Route
        path={PAGES.groupDetail}
        render={(props) => <GroupWorkDetail {...props} />}
      />
      <Route path={PAGES.terms} component={TermsScreen} exact />
      <Route path={PAGES.myProfile} component={UserProfileScreen} exact />
      <Route 
        path={PAGES.userProfile} 
        render={props => <UserProfileScreen {...props} />} 
        exact 
      />
      <Route path={PAGES.editProfile} component={EditProfile} exact />
      <Route
        path={PAGES.search}
        render={(props) => <SearchPage {...props} />}
        exact
      />
      <Route
        path={PAGES.postDetail} sensitive={true}
        render={(props) => <PostDetail {...props} />}
        exact
      />
      <Route path={PAGES.listNotification} component={Notifications} exact />
      <Route path={PAGES.settingNoti} component={SettingScreen} exact />

      <Redirect from="*" to={PAGES.home} />
    </Switch>
  );
};
