import { CurrentUserType, PostType } from "./types"

export type GalleryReduceType = {
  posts: PostType[]
  favorites: PostType[]
}

export type LoadingReduceType = {
  loading: boolean
  globalLoading: boolean
}

export type AuthReduceType = {
  isAuth: boolean
  currentUser: CurrentUserType | null
}

export type ToastReduceType = {
  message: string
  show: boolean
}

export type FavoriteReduceType = {
  favorites: Array<PostType>
}

export type GetOwnPhotosReduceType = {
  photos: Array<PostType>
}

export type SearchReduceType = {
  searched: Array<PostType>
}

export type LikeReduceType = {
  message: string
}