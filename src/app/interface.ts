export interface UserType {
  image: ImgType,
  username: string
}

interface ImgType {
  png: string,
  webp: string
}

export interface CommentType {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replies: ReplyType[]
}

interface ReplyType extends CommentType {
  replyingTo: string,
  user: UserType
}

export interface CommentInfo {
  currentUser: UserType,
  comments: CommentType[]
}