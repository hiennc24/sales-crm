
/* eslint-disable no-unused-vars */
// import { fromJS } from 'immutable';
import { stubFalse, truncate } from 'lodash';
import * as moment from 'moment'
import { useSelector, useDispatch } from "react-redux";
import {
    CREATE_POST,
    CREATE_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    CREATE_COMMENT_SUCCESS,
    GET_LIST_POSTS,
    GET_LIST_POSTS_SUCCESS,
    GET_LIST_HOT_POSTS,
    GET_LIST_HOT_POSTS_SUCCESS,
    GET_LIST_ATTENTION_POSTS,
    GET_LIST_ATTENTION_POSTS_SUCCESS,
    GET_LIST_CONSIDERED_POSTS,
    GET_LIST_CONSIDERED_POSTS_SUCCESS,
    PIN_POST_SUCCESS,
    REACT_POST_SUCCESS,
    GET_POST_SUCCESS,
    CLEAR_DATA,
    DELETE_EVENT_SUCCESS,
    DELETE_POST_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    GET_COMMENTS,
    GET_COMMENTS_SUCCESS,
    ADD_ANSWER_SUCCESS,
    REMOVE_ANSWER_SUCCESS,
    UPDATE_VOTE_SUCCESS,
    CLEAR_PRIORITY_DATA,
    VOTE_ANSWER_SUCCESS,
    UPDATE_PRIORITY_STATUS_SUCCESS,
    UPDATE_PRIORITY_PROCESS_SUCCESS,
    DELETE_POST_BEFORE_SUBMIT
} from './posts.action';
import {
    getListHotPosts
} from "./posts.action";
// const initialState = fromJS({
//  posts: [],
//  targetPost: null,
//  loading: false,
// });
const initialState = {
    posts: [],
    internalPosts: [],
    todoPosts: [],
    eventPosts: [],
    votePosts: [],
    hotPosts: [],
    attentionPosts: [],
    consideredPosts: [],
    targetPost: {},
    loading: false,
    loadingPosts: false,
    isLoadMore: true,
    isLoadMoreHostPost: true,
    isLoadMoreAttentionPost: true,
    isLoadMoreConsideredPost: true,
    comments: [],
    changeDelete: 0,
    priorityType: 0
};
let listener = () => {
    dispatch(getListHotPosts({
        groupId: 0,
        type: 1,
        priority: 1,
        index: 1,
        pageSize: 5,
    }))

};
const middleware = (action) => {

    if (action.type === "DELETE_POST_SUCCESS") {
        listener()
    }
};
const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_LIST_POSTS:
            return { ...state, loadingPosts: true };
        case GET_LIST_POSTS_SUCCESS:
            // return state.set('loading', false).set('posts', newListPost);
            let internalPosts = [];
            let todoPosts = [];
            let eventPosts = [];
            let votePosts = [];
            let posts = [];
            console.log('action', action.payload)
            switch (action.payload.type) {
                case 0:
                    todoPosts = action.payload.posts;
                    posts = [...state.todoPosts, ...todoPosts];
                    console.log('case 0', posts)
                    break;
                case 1:
                    internalPosts = action.payload.posts;
                    posts = [...state.internalPosts, ...internalPosts];
                    console.log('case 1', posts)
                    break;
                case 2:
                    votePosts = action.payload.posts;
                    posts = [...state.votePosts, ...votePosts];
                    console.log('case 2', posts)
                    break;
                case 3:
                    eventPosts = action.payload.posts;
                    posts = [...state.eventPosts, ...eventPosts];
                    console.log('case 3', posts)
                    break;
                default:
                    posts = [...state.posts, ...action.payload.posts];
                    console.log('case default', posts)
                    break;
            }
            if (!action.payload.loaded) posts = [...state.posts, ...action.payload.posts];
            const newState = {
                ...state,
                posts: [...posts],
                todoPosts: [...state.todoPosts, ...todoPosts],
                internalPosts: [...state.internalPosts, ...internalPosts],
                votePosts: [...state.votePosts, ...votePosts],
                eventPosts: [...state.eventPosts, ...eventPosts],
                loadingPosts: false,
                isLoadMore: action.payload.posts.length === 5
            };
            return newState;
        case GET_LIST_HOT_POSTS:
            return { ...state, loading: true };
        case GET_LIST_HOT_POSTS_SUCCESS:
            // return state.set('loading', false).set('posts', newListPost);
            const newStateHot = {
                ...state,
                hotPosts: action.payload,
                loading: false,
                isLoadMoreHostPost: action.payload.length === 7
            };

            return newStateHot;
        case GET_LIST_ATTENTION_POSTS:
            return { ...state, loading: true };
        case GET_LIST_ATTENTION_POSTS_SUCCESS:
            // return state.set('loading', false).set('posts', newListPost);
            const newStateAttention = {
                ...state,
                attentionPosts: action.payload,
                loading: false,
                isLoadMoreAttentionPost: action.payload.length === 7
            };

            return newStateAttention;
        case GET_LIST_CONSIDERED_POSTS:
            return { ...state, loading: true };
        case GET_LIST_CONSIDERED_POSTS_SUCCESS:
            const newStateConsidered = {
                ...state,
                consideredPosts: action.payload,
                loading: false,
                isLoadMoreConsideredPost: action.payload.length === 7
            };
            return newStateConsidered;
        case CREATE_POST:
            return { ...state, loading: true };
        case CREATE_POST_SUCCESS: {
            const newListPosts = [...state.posts.filter(r => r.IsPin), { ...action.payload, comments: [] }, ...state.posts.filter(r => !r.IsPin)];
            return { ...state, loading: false, posts: newListPosts };
        }
        case REACT_POST_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (+post.Id === +action.payload.id) {
                    post.IsLike = !!action.payload.status;
                    post.CountLike += action.payload.status ? 1 : -1;
                }
                return post;
            });
            const targetPost = { ...state.targetPost }
            if (+targetPost?.Id === +action.payload.id) {
                targetPost.IsLike = !!action.payload.status;
                targetPost.CountLike += action.payload.status ? 1 : -1;
            }
            return { ...state, posts: newListPosts, targetPost };
        }
        case VOTE_ANSWER_SUCCESS: {
            // const newListPosts = state.posts.map(post => {
            //  if (post.Id === action.payload.id) {
            //      post.IsLike = !!action.payload.status;
            //      post.CountLike += action.payload.status ? 1 : -1;
            //  }
            const newListPosts = state.posts.map(post => {
                // if (post.Id === action.payload.id) {
                //  post.IsLike = !!action.payload.status;
                //  post.CountLike += action.payload.status ? 1 : -1;
                // }
                post?.Details?.Details.forEach((p) => {
                    if (p.Id == action.payload.data.answerId) {
                        if (action.payload.data.active == 1) {
                            if (p.VoteUser) {
                                // console.log("SUCCESS 1", action.payload.userInfo, [...JSON.parse(p.VoteUser), action.payload.userInfo], JSON.stringify(JSON.parse(p.VoteUser).push(action.payload.userInfo)))
                                p.VoteUser = JSON.stringify([...JSON.parse(p.VoteUser), action.payload.userInfo])
                            }
                            else {
                                p.VoteUser = JSON.stringify([action.payload.userInfo])
                            }
                            p.VoteNumber++;
                        }
                        else {
                            if (p.VoteUser) {
                                p.VoteUser = JSON.stringify(JSON.parse(p.VoteUser).filter(u => u.Id != action.payload.userInfo.Id))
                            }
                            else {
                                p.VoteUser = JSON.stringify([])
                            }
                            p.VoteNumber--;
                        }
                    }
                })
                return post;
            });
            return { ...state, posts: newListPosts };
        }
        case PIN_POST_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (post.Id === action.payload.id) {
                    post.IsPin = !post.IsPin;
                }
                else {
                    post.IsPin = false;
                }
                return post;
            });
            const sortListPost = [
                ...newListPosts.filter(post => post.IsPin),
                ...newListPosts.filter(post => !post.IsPin).sort((a, b) => {
                    if (moment(a.CreatedAt).isBefore(b.CreatedAt)) {
                        return 1;
                    }
                    return -1;
                }),
            ];
            const targetPost = { ...state.targetPost }
            if (+targetPost?.Id === +action.payload.id) {
                targetPost.IsPin = !targetPost.IsPin;
            }
            return { ...state, posts: sortListPost, targetPost };
        }
        case EDIT_POST_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (post.Id == action.payload.Id) {
                    return { ...action.payload, comments: post.comments }
                }
                return post;

            });
            let newHotList = state.hotPosts.filter(post => post.Id != action.payload.Id);
            let newAttentionPosts = state.attentionPosts.filter(post => post.Id != action.payload.Id);
            let newConsideredPosts = state.consideredPosts.filter(post => post.Id != action.payload.Id);
            const compareDate = (a, b) => {
                return moment(a) > moment(b);
            }
            if (action.payload.Priority == 1) {
                newHotList = [
                    ...newHotList.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newHotList.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }
            else if (action.payload.Priority == 2) {
                newAttentionPosts = [
                    ...newAttentionPosts.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newAttentionPosts.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }
            else if (action.payload.Priority == 3) {
                newConsideredPosts = [
                    ...newConsideredPosts.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newConsideredPosts.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }

            return { ...state, loading: false, posts: newListPosts, hotPosts: newHotList, attentionPosts: newAttentionPosts, consideredPosts: newConsideredPosts, targetPost: { ...action.payload, comments: state.targetPost.comments } };
        }
        case EDIT_COMMENT_SUCCESS: {

            const newListPosts = [...state.posts]
            let rs = newListPosts;

            for (let i = 0; i < action.payload.parentList.length; i++) {
                if (i === 0) {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])?.comments;
                    if (!rs) {
                        break;
                    }
                    if (action.payload.parentList.length === 2) {
                        const newCmt = { ...action.payload };
                        delete newCmt.parentList;
                        newListPosts.find(item => +item.Id === +action.payload.parentList[0]).comments = rs.map(item => {
                            if (+item.Id === +newCmt.Id) return { ...newCmt, Comments: item.Comments };
                            return item;
                        })
                        break;
                    }

                }
                else if (i === action.payload.parentList.length - 1) {
                    const newCmt = { ...action.payload };
                    delete newCmt.parentList;
                    rs.Comments = rs.Comments.map(item => {
                        if (+item.Id === +newCmt.Id) return { ...newCmt, Comments: item.Comments };
                        return item;
                    })
                }
                else {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])
                }
            }

            const targetPost = { ...state.targetPost }

            if (+targetPost.Id === +action.payload.parentList[0]) {

                if (action.payload.parentList.length === 2) {
                    const newCmt = { ...action.payload };
                    delete newCmt.parentList;
                    targetPost.comments = targetPost.comments.map(item => {
                        if (+item.Id === +newCmt.Id) {
                            return { ...newCmt, Comments: item.Comments };
                        }
                        return item;
                    });

                }
                else {
                    let newData = targetPost.comments;
                    for (let i = 1; i < action.payload.parentList.length; i++) {
                        if (i === action.payload.parentList.length - 1) {
                            const newCmt = { ...action.payload };
                            delete newCmt.parentList;
                            newData.Comments = newData.Comments.map(item => {
                                if (+item.Id === +newCmt.Id) return { ...newCmt, Comments: item.Comments };
                                return item;
                            })
                        }
                        else {
                            newData = newData.find(item => +item.Id === +action.payload.parentList[i])
                        }
                    }
                }
            }
            return { ...state, loading: false, posts: newListPosts, targetPost: targetPost };
        }
        case CREATE_COMMENT_SUCCESS: {

            const newListPosts = [...state.posts]
            let rs = newListPosts;
            for (let i = 0; i < action.payload.parentList.length; i++) {
                if (i === 0) {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])?.comments;
                    if (!rs) {
                        break;
                    }
                    if (action.payload.parentList.length === 1) {
                        const newCmt = { ...action.payload };
                        delete newCmt.parentList;
                        newListPosts.find(item => +item.Id === +action.payload.parentList[i]).comments = [...rs, { ...newCmt, Comments: [] }];
                        newListPosts.find(item => +item.Id === +action.payload.parentList[i]).CountComment++;
                        break;
                    }

                }
                else if (i === action.payload.parentList.length - 1) {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])
                    const newCmt = { ...action.payload };
                    delete newCmt.parentList;
                    rs.Comments = [...rs.Comments, newCmt]
                }
                else {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])?.Comments
                }
            }

            const targetPost = { ...state.targetPost }

            if (+targetPost.Id === +action.payload.parentList[0]) {

                if (action.payload.parentList.length === 1) {
                    const newCmt = { ...action.payload };
                    delete newCmt.parentList;
                    targetPost.comments = [...targetPost.comments, { ...newCmt, Comments: [] }];
                    targetPost.CountComment++;

                }
                else {
                    let newData = targetPost.comments;
                    for (let i = 1; i < action.payload.parentList.length; i++) {
                        if (i === action.payload.parentList.length - 1) {
                            newData = newData.find(item => +item.Id === +action.payload.parentList[i])
                            const newCmt = { ...action.payload };
                            delete newCmt.parentList;
                            newData.Comments = [...newData.Comments, newCmt]
                        }
                        else {
                            newData = newData.find(item => +item.Id === +action.payload.parentList[i])?.Comments
                        }
                    }
                }

            }

            return { ...state, posts: newListPosts, targetPost: targetPost };
        }
        case GET_POST_SUCCESS: {
            return { ...state, targetPost: { ...action.payload } };
        }
        case CLEAR_DATA: {
            return { ...state, posts: [] };
        }
        case CLEAR_PRIORITY_DATA: {
            return { ...state, hotPosts: [], attentionPosts: [], consideredPosts: [] };
        }
        case DELETE_EVENT_SUCCESS: {
            console.log('action.payload', action.payload)
            const newEventList = [...state.eventPosts].filter(item => item.Details?.Id !== action.payload);
            return {
                ...state,
                eventPosts: [...newEventList],
                posts: [...newEventList],
            };
        }
        case DELETE_POST_SUCCESS: {
            const newListPost = state.posts.filter(
                post => post.Id !== action.payload
            );
            const hotPosts = state.posts.find(
                post => post.Id === action.payload
            );
            if (typeof hotPosts === "undefined")
                return {
                    ...state,
                    posts: newListPost,
                    changeDelete: ++state.changeDelete,
                    priorityType: 0
                };
            return {
                ...state,
                changeDelete: ++state.changeDelete,
                posts: newListPost,
                priorityType: hotPosts.Priority
            };
        }
        case DELETE_COMMENT_SUCCESS: {

            const newListPosts = [...state.posts]
            let rs = newListPosts;

            for (let i = 0; i < action.payload.parentList.length; i++) {
                if (i === 0) {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])?.comments;
                    if (!rs) {
                        break;
                    }
                    if (action.payload.parentList.length === 2) {
                        newListPosts.find(item => +item.Id === +action.payload.parentList[0]).comments = rs.filter(item => +item.Id !== +action.payload.id)
                        newListPosts.find(item => +item.Id === +action.payload.parentList[i]).CountComment--;
                        break;
                    }

                }
                else if (i === action.payload.parentList.length - 1) {
                    rs.Comments = rs.Comments.filter(item => +item.Id !== +action.payload.id)
                }
                else {
                    rs = rs.find(item => +item.Id === +action.payload.parentList[i])
                }
            }

            const targetPost = { ...state.targetPost }

            if (+targetPost.Id === +action.payload.parentList[0]) {

                if (action.payload.parentList.length === 2) {
                    targetPost.comments = targetPost.comments.filter(item => +item.Id !== +action.payload.id)
                    targetPost.CountComment--;
                }
                else {
                    let newData = targetPost.comments;
                    for (let i = 1; i < action.payload.parentList.length; i++) {
                        if (i === action.payload.parentList.length - 1) {
                            const newCmt = { ...action.payload };
                            delete newCmt.parentList;
                            newData.Comments = newData.Comments.filter(item => +item.Id !== +action.payload.id)
                        }
                        else {
                            newData = newData.find(item => +item.Id === +action.payload.parentList[i])
                        }
                    }
                }
            }

            return {
                ...state,
                posts: newListPosts,
                targetPost: targetPost,
                comments: []
            };
        }
        case GET_COMMENTS_SUCCESS: {
            action.payload.comments = action.payload.comments.map(rs => {
                if (!rs.Comments) {
                    return { ...rs, Comments: [] }
                }
                return rs;
            })

            const newListPost = state.posts.map(post => {
                if (post.Id == action.payload.id) {
                    post.comments = [...action.payload.comments.sort((a, b) => {
                        if (moment(a.CreatedAt).isBefore(b.CreatedAt)) {
                            return -1;
                        }
                        return 1;
                    }),
                    ...post.comments
                    ]
                }
                return post;
            });
            const targetPost = { ...state.targetPost };
            if (targetPost?.Id == +action.payload.id) {
                targetPost.comments = [...action.payload.comments.sort((a, b) => {
                    if (moment(a.CreatedAt).isBefore(b.CreatedAt)) {
                        return -1;
                    }
                    return 1;
                }), ...targetPost.comments]
            }
            return {
                ...state,
                posts: newListPost,
                targetPost
            };
        }
        case ADD_ANSWER_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (post.Id == action.payload.PostId) {
                    post.Details.Details = [...post.Details.Details, action.payload];
                }
                return post;
            });
            return {
                ...state,
                posts: newListPosts,
            };
        }
        case REMOVE_ANSWER_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (post.Id == action.payload.payload.postId) {
                    post.Details.Details = post.Details.Details.filter(
                        item => item.Id != action.payload.payload.data.answerId
                    );
                }
                return post;
            });
            return {
                ...state,
                posts: newListPosts,
            };
        }
        case UPDATE_VOTE_SUCCESS: {
            const newListPosts = state.posts.map(post => {
                if (post.Id == action.payload.Id) {
                    return { ...action.payload, comments: post.comments };
                }
                return post;
            });
            let newHotList = state.hotPosts.filter(post => post.Id != action.payload.Id);
            let newAttentionPosts = state.attentionPosts.filter(post => post.Id != action.payload.Id);
            let newConsideredPosts = state.consideredPosts.filter(post => post.Id != action.payload.Id);
            const compareDate = (a, b) => {
                return moment(a) > moment(b);
            }
            if (action.payload.Priority == 1) {
                newHotList = [
                    ...newHotList.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newHotList.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }
            else if (action.payload.Priority == 2) {
                newAttentionPosts = [
                    ...newAttentionPosts.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newAttentionPosts.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }
            else if (action.payload.Priority == 3) {
                newConsideredPosts = [
                    ...newConsideredPosts.filter(p => compareDate(p.CreatedAt, action.payload.CreatedAt)),
                    action.payload,
                    ...newConsideredPosts.filter(p => !compareDate(p.CreatedAt, action.payload.CreatedAt))
                ]
            }
            return {
                ...state,
                posts: newListPosts,
                hotPosts: newHotList,
                attentionPosts: newAttentionPosts,
                consideredPosts: newConsideredPosts,
                targetPost: { ...action.payload, comments: state.targetPost.comments }
            };
        }
        case UPDATE_PRIORITY_PROCESS_SUCCESS: {
            let type = 0;
            let foundPost = {}
            let foundPost2 = JSON.parse(JSON.stringify(state.targetPost));
            const newListPost = state.posts.map(post => {
                if (post.Id == action.payload.payload.id) {
                    foundPost = JSON.parse(JSON.stringify(post));
                    if (action.payload.payload.type === 0) {
                        post.DelPriority = true
                        post.Handled = false
                        type = post.Priority
                    }
                    if (action.payload.payload.type === 1) {
                        post.DelPriority = true
                        post.Handled = true
                        type = post.Priority
                    }

                }

                return post;
            });
            if (action.payload.payload.type === 0) {
                foundPost2.DelPriority = true
                foundPost2.Handled = false
            }
            if (action.payload.payload.type === 1) {
                foundPost2.DelPriority = true
                foundPost2.Handled = true
            }

            if (foundPost?.DelPriority === true)//hided on priority tab
                return {
                    ...state,
                    posts: newListPost,
                    targetPost: foundPost2
                }
            if (foundPost?.DelPriority === null)
                return {
                    ...state,
                    posts: newListPost,
                    priorityType: type,
                    changeDelete: ++state.changeDelete,
                    targetPost: foundPost2
                }
            return {
                ...state,
                posts: newListPost,
                priorityType: type,
                changeDelete: ++state.changeDelete,
                targetPost: foundPost2
            }
        }
        case DELETE_POST_BEFORE_SUBMIT: {
            return {
                ...state,
                posts: []
            }
        }
        default:
            return state;
    }
};
export default postsReducer;
