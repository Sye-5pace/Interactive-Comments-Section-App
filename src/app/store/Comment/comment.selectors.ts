import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './comment.reducer'

export const selectCommentFeature = createFeatureSelector<IState>('commentInfo')

export const selectCommentInfo = createSelector(
  selectCommentFeature,
  (state: IState) => state.commentInfo
);

export const selectLoadCommentSuccess = createSelector(
  selectCommentFeature,
  (state: IState) => state.laoding
)

export const selectLoadCommentFailure = createSelector(
  selectCommentFeature,
  (state: IState) => state.error
)