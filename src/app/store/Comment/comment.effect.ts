import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommentService } from '../../comment.service';
import { CommentActions } from './comment.actions'


@Injectable () 
export class CommentEffects {
  // const { InitializeComment, LoadCommentsSuccess, LoadCommentsFailure } = CommentActions
  initializeComment$ = createEffect(() =>  
    this.actions$.pipe(
      ofType(CommentActions.initializeComment),
      mergeMap(() => 
        this.commentService.getCommentInfo().pipe(
          map((commentInfo) => CommentActions.loadCommentsSuccess({commentInfo})),
          catchError((error) => of(CommentActions.loadCommentsFailure({ error })))
        )
      )
    )
  )

  constructor( private actions$: Actions, private commentService: CommentService) {}
}