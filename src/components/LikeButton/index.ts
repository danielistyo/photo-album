import LikeButton from "./LikeButton";

export type CallbackLikeButton = (
  photoId: number,
  like: boolean,
  albumId?: number
) => void;
export type LikeButtonProps = {
  isLike: boolean;
  photoId: number;
  onClick: CallbackLikeButton;
  className: string;
};
export default LikeButton;
