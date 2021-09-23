import AlbumUser from "../AlbumUser";
import CommentInput, { CallbackInput } from "../CommentInput";
import LikeButton, { CallbackLikeButton } from "../LikeButton";
import './AlbumPhoto.scss';

type Props = {
    photoId: number; photoUrl: string; photoTitle: string; albumId: number;
    userId: number; username: string; email: string;
    albumTitle: string; isFavorite: boolean; handleLike: CallbackLikeButton;
    comments: string[] | undefined; handleCommentInput: CallbackInput
}
const AlbumPhoto = ({
    photoId, photoUrl, userId, username, email, photoTitle, albumId,
    albumTitle, isFavorite, handleLike, comments, handleCommentInput
}: Props): JSX.Element => {

    const handleLikeClick: CallbackLikeButton = (photoId, like) => {
        handleLike(photoId, like, albumId);
    }

    const commentCallback: CallbackInput = (photoId, comment) => {
        handleCommentInput(photoId, comment, albumId);
    }
    return <div key={photoId} className="album-photo">
        <AlbumUser userId={userId} username={username} email={email} className="album-photo__user" />
        <img src={photoUrl} loading="lazy" alt={photoTitle} className="album-photo__image" />
        <div className="album-photo__title">
            <strong>{photoTitle}</strong> - {albumTitle}
            <LikeButton
                className="album-photo__like"
                photoId={photoId} isLike={isFavorite}
                onClick={handleLikeClick} />
        </div>

        <h5 className="album-photo__comment-title">Comments</h5>
        <div className="album-photo__comments">
            {comments?.map((comment, index) =>
                <div key={`${index}${photoId}`} className="album-photo__comment">- {comment}</div>)}
        </div>
        <CommentInput className="album-photo__input" photoId={photoId} callback={commentCallback} />
    </div>
}

export default AlbumPhoto;