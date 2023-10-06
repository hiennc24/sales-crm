import {atom} from 'recoil';

export const listConversationUnread = atom({
    key: 'listConversationUnread',	
    default: [],		
  });

export const openChatModalState = atom({
  key: 'openChatModalState',	
  default: false,	
})