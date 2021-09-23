import CommentInput from "./CommentInput";

export type CallbackInput = (
  photoId: number,
  comment: string,
  albumId?: number
) => void;
export type CommentInputProps = {
  photoId: number;
  callback: CallbackInput;
  className: string;
};

export default CommentInput;
