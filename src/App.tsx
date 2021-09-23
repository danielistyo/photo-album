import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, RouteProps } from 'react-router-dom';
import routes from './routes';
import endpoints from "./service";
import { ProviderProps, anyStore as storeContext } from './store';
import './App.scss';


function App() {
  const { state, dispatch } = useContext<ProviderProps>(storeContext);
  const [isGettingUser, setIsGettingUser] = useState(false)
  const [isGettingPhoto, setIsGettingPhoto] = useState(false)
  const [isError, setIsError] = useState(false);

  const fetchAlbum = useCallback(
    async () => {
      if (!state.albums.length && !isGettingPhoto) {
        try {
          setIsGettingPhoto(true)
          const albums = await endpoints.getAlbums()
          await dispatch({ type: 'ADD_ALBUMS', payload: albums })
          const photos = await endpoints.getPhotos()
          await dispatch({ type: 'ADD_PHOTOS', payload: photos })

          setIsGettingPhoto(false);
        } catch (error) {
          console.error(error);
          setIsError(true);
        }
      }
    },
    [dispatch, isGettingPhoto, state.albums.length]
  )

  const fetchUser = useCallback(async () => {
    if (!state.users.length && !isGettingUser) {
      try {
        setIsGettingUser(true);
        const users = await endpoints.getUsers()
        dispatch({ type: 'ADD_USERS', payload: users })
        setIsGettingUser(false);
      } catch (error) {
        console.error(error)
        setIsError(true);
      }
    }
  }, [dispatch, isGettingUser, state.users.length])


  useEffect(() => {
    fetchUser();
    fetchAlbum();
  }, [fetchAlbum, fetchUser])

  const handleRetry = () => {
    fetchUser();
    fetchAlbum();
  }

  return (
    <>
      <div className="app__header">Photo Album</div>
      {
        isError ? <button onClick={handleRetry}>Retry</button> :
          <BrowserRouter>
            <Switch>
              {
                routes.map((route: RouteProps, i) => (<Route key={i} {...route} />))
              }
            </Switch>
          </BrowserRouter>
      }
    </>
  );
}

export default App;
