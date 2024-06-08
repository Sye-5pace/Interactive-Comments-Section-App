import { createActionGroup,emptyProps, props } from '@ngrx/store';
import { ICommentInfo,IReplyType,ICommentType, IUserType } from '../../icomments-info'


export const CommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Initialize Comment': emptyProps(),
    'Load Comments Success': props<{ commentInfo: ICommentInfo }>(),
    'Load Comments Failure': props<{ error: any}>(),
    'Add Comments': props<{ comment: ICommentType, currentUser: IUserType}>(),
    'Add Reply': props<{ commentId: number,  reply: IReplyType, currentUser: IUserType }>(),
    'Delete Reply': props<{ commentId: number, replyId: number }>(),
    'Edit Reply': props<{ commentId: number, replyId: number, editedReply: IReplyType }>()
  }
});



// Scribble logs associated with each project for the day
// in milanote


