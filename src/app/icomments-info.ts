export interface IUserType {
  image: ImgType,
  username: string
}

interface ImgType {
  [key: string]: string,
}

export interface ICommentType {
  id: number,
  content: string,
  createdAt: string,
  score?: number ,
  replies?: IReplyType[]
}

export interface IReplyType extends ICommentType {
  replyingTo: string,
  user: IUserType
}

export interface ICommentInfo {
  currentUser: IUserType,
  comments: ICommentType[] | undefined
}
