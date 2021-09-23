import { useContext } from "react";
import AlbumPhoto from "../../components/AlbumPhoto";
import { CallbackInput } from "../../components/CommentInput";
import { CallbackLikeButton } from "../../components/LikeButton";
import { ProviderProps, anyStore as storeContext } from "../../store";
import { Photo } from "../../typings";
import './Favorites.scss';

const Favorites = (): JSX.Element => {
    const { state: { favorites, albums, users }, dispatch } = useContext<ProviderProps>(storeContext);
    const favPhotos: Array<Photo & {
        albumName: string;
        userName: string;
        email: string;
        userId: number;
    }> = []
    const arrFavorites = Object.keys(favorites);
    if (!arrFavorites.length) return <div>No Favorites</div>

    arrFavorites.forEach((albumIdstr: string) => {
        const albumId = parseInt(albumIdstr, 10);
        const favAlbum = albums.find(album => album.id === albumId);
        if (!favAlbum) return;


        const user = users.find(user => user.id === favAlbum.userId)
        const photos = favAlbum.photos
            .filter(photo => favorites[albumId].includes(photo.id))
            .map(photo => (
                {
                    ...photo,
                    albumName: favAlbum.title,
                    userName: user?.name || '',
                    userId: user?.id || 0,
                    email: user?.email || ''
                }))
        favPhotos.push(...photos)
    })
    const handleSubmit: CallbackInput = (photoId, comment, albumId) => {
        console.log(photoId, comment, albumId);
        if (albumId) dispatch({ type: 'ADD_COMMENT', payload: { albumId, photoId, comment } })
    }

    const handleLike: CallbackLikeButton = (photoId, value, albumId) => {

        if (albumId) dispatch({ type: 'LIKE_PHOTO', payload: { albumId, photoId, value } })
    }
    return <div className="favorite-page">
        {favPhotos.map(photo =>
            <AlbumPhoto
                key={photo.id}
                albumId={photo.albumId}
                photoId={photo.id}
                photoUrl={photo.url}
                userId={photo.userId}
                username={photo.userName}
                email={photo.email}
                photoTitle={photo.title}
                albumTitle={photo.albumName}
                isFavorite={favorites[photo.albumId].includes(photo.id)}
                handleLike={handleLike}
                comments={photo.comments}
                handleCommentInput={handleSubmit} />)
        }
    </div>
}

export default Favorites