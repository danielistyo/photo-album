import React, { createContext, useReducer } from "react";
import { Actions, Album, Photo, User } from "./typings";

type InitialState = {
  users: User[];
  albums: Album[];
  // below type is {albumId: photoId[]}
  favorites: { [key in number]: number[] }
};
const initialState: InitialState = {
  users: [],
  albums: [],
  favorites: {}
};
const store = createContext(initialState);
const { Provider } = store;

// cast to any to simplify casting on specific component
const anyStore = store as any;

export type ProviderProps = { state: InitialState, dispatch: React.Dispatch<Actions> };
const StoreProvider = Provider as unknown as React.Provider<ProviderProps>;


const StateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [state, dispatch] = useReducer(
    (state: InitialState, action: Actions): InitialState => {
      let albums: Album[];
      switch (action.type) {
        case "ADD_USERS":
          return { ...state, users: action.payload }
        case "ADD_ALBUMS":
          return { ...state, albums: action.payload }
        case "ADD_PHOTOS":
          albums = state.albums.map(album => {
            const photos = action.payload.filter(photo => photo.albumId === album.id);
            return { ...album, photos }
          })
          return { ...state, albums }
        case 'ADD_COMMENT': {
          const { payload: { albumId, comment, photoId } } = action;
          albums = state.albums.map((album): Album => {
            if (album.id === albumId) {
              const photos = album.photos.map((photo): Photo => {
                if (photo.id === photoId) {
                  const comments = Array.isArray(photo.comments) ? photo.comments : [];
                  return { ...photo, comments: [...comments, comment] }
                }
                return photo;
              })
              return { ...album, photos: [...photos] }
            }
            return album
          })

          return { ...state, albums }
        }
        case 'LIKE_PHOTO': {
          const { payload: { albumId, value, photoId } } = action;
          const selectedFavorite = state.favorites[albumId] || [];

          let albumFavorites: number[] = [];
          if (value) {
            albumFavorites = [...selectedFavorite, photoId]
          } else {
            albumFavorites = selectedFavorite.filter(favPhotoId => favPhotoId !== photoId)
          }

          return { ...state, favorites: { ...state.favorites, [albumId]: albumFavorites } }
        }
        default:
          throw new Error();
      }
    },
    initialState
  );

  return <StoreProvider value={{ state, dispatch }}>{children}</StoreProvider>;
};

export { anyStore, StateProvider };
