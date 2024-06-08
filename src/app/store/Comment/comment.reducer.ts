import { Action, createReducer, on } from '@ngrx/store';
import { CommentActions, } from './comment.actions';
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage'
import { ICommentInfo, ICommentType , IUserType,  } from '../../icomments-info'


// export const commentFeatureKey = 'comment';

export interface IState {
  commentInfo: ICommentInfo | null,
  currentUser: IUserType | null
  loading: boolean;
  error: string | null
}

export const initialState: IState = {
  commentInfo: null,
  currentUser: null,
  loading: false,
  error: null
};

const storageConfig: LocalStorageConfig = {
  keys: [{ comments: ['commentInfo']}, {user : ['currentUser']}],
  storage: localStorage,
  rehydrate: true 
}



export const reducer = createReducer(
  initialState,
  on(CommentActions.initializeComment, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommentActions.loadCommentsSuccess, (state, action) => ({
    ...state,
    commentInfo: action.commentInfo,
    loading: false,
    error: null,
  })),
  on(CommentActions.loadCommentsFailure, (state, action) => ({
    ...state,
    commentInfo: null,
    loading: false,
    error: action.error,
  })),
  on(CommentActions.addComments, (state, action) => ({
    ...state,
    comments: state.commentInfo?.comments
      ? [...state.commentInfo.comments, action.comment]
      : [action.comment],
    currentUser: action.currentUser,
    loading: false,
    error: null,
  })),
  on(CommentActions.addReply, (state, action) => {
    const { commentId, reply } = action;
    if (state.commentInfo?.comments) {
      const updatedComments = state.commentInfo.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      });
      return {
        ...state,
        commentInfo: {
          ...state.commentInfo,
          comments: updatedComments,
        },
        loading: false,
        error: null,
      };
    } else {
      return state;
    }
  }),
  on(CommentActions.deleteReply, (state, action) => {
    const { commentId, replyId } = action;
    if (state.commentInfo?.comments) {
      const updatedComments = state.commentInfo.comments.map((comment) => {
        if (comment.id === commentId && comment.replies) {
          const filteredReplies = comment.replies.filter((reply) => reply.id !== replyId); // Filter out the reply to delete
          return {
            ...comment,
            replies: filteredReplies,
          };
        }
        return comment;
      });
      return {
        ...state,
        commentInfo: {
          ...state.commentInfo,
          comments: updatedComments,
        },
        loading: false,
        error: null,
      };
    } else {
      return state;
    }
  }),
  on(CommentActions.editReply, (state, action) => {
    const { commentId, replyId, editedReply } = action; // Assuming action payload includes commentId, replyId and editedReply
    if (state.commentInfo?.comments) {
      const updatedComments = state.commentInfo.comments.map((comment) => {
        if (comment.id === commentId && comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                ...editedReply
              };
            }
            return reply;
          });
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });
      return {
        ...state,
        commentInfo: {
          ...state.commentInfo,
          comments: updatedComments,
        },
        loading: false,
        error: null,
      };
    } else {
      return state;
    }
  }),
);


export const commentReducer = (state: IState, action: Action) => {
  return localStorageSync(storageConfig)(reducer)(state, action)
}
// use switch case statement approach for reducers handlers
// for addReply,DeleteReply,EditReply
// and addComments with normal approach(Action Creator)

// Defaultize the value of  score to 1 in ui dev
