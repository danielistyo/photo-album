import { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import AlbumPhoto from "../../components/AlbumPhoto";
import { CallbackInput } from "../../components/CommentInput";
import { CallbackLikeButton } from "../../components/LikeButton";
import { anyStore as storeContext, ProviderProps } from "../../store";
import { RouteAlbumParams } from "../../typings";
import './Album.scss'


const Album = (): JSX.Element => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { state: { albums, favorites, users }, dispatch } = useContext<ProviderProps>(storeContext);
    const params = useParams<RouteAlbumParams>();

    const selectedAlbum = albums.find(album => album.id === parseInt(params.id, 10));
    if (!selectedAlbum || !selectedAlbum.photos) return <div>Not Found</div>

    const albumFavorites = favorites[selectedAlbum.id]
    const handleSubmit: CallbackInput = (photoId, comment) => {
        dispatch({ type: 'ADD_COMMENT', payload: { albumId: selectedAlbum.id, photoId, comment } })
    }

    const handleLike: CallbackLikeButton = (photoId, value) => {
        dispatch({ type: 'LIKE_PHOTO', payload: { albumId: selectedAlbum.id, photoId, value } })
    }

    const selectedUser = users.find(user => user.id === selectedAlbum.userId);

    return <div className="album">
        {selectedAlbum.photos.map(photo => {
            return <AlbumPhoto
                key={photo.id}
                albumId={selectedAlbum.id}
                photoId={photo.id}
                photoUrl={photo.url}
                userId={selectedUser?.id || 0}
                username={selectedUser?.username || ''}
                email={selectedUser?.email || ''}
                photoTitle={photo.title}
                albumTitle={selectedAlbum?.title || ''}
                isFavorite={albumFavorites ? albumFavorites.includes(photo.id) : false}
                handleLike={handleLike}
                comments={photo.comments}
                handleCommentInput={handleSubmit} />
        })}
    </div>
}

export default Album;