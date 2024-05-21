export interface IUserType {
  image: ImgType,
  username: string
}

interface ImgType {
  png: string,
  webp: string
}

export interface ICommentType {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replies: IReplyType[]
}

interface IReplyType extends ICommentType {
  replyingTo: string,
  user: IUserType
}

export interface ICommentInfo {
  currentUser: IUserType,
  comments: ICommentType[]
}