import { FormEvent, useContext, useMemo, useState } from "react";
import { ProviderProps, anyStore as storeContext } from "../../store";
import { Album } from "../../typings";
import union from 'lodash/union'
import AlbumCard from "../../components/AlbumCard";
import { Link } from "react-router-dom";
import './Home.scss';


const Home = (): JSX.Element => {
    const { state: { albums, users } } = useContext<ProviderProps>(storeContext);
    const [keyword, setKeyword] = useState('');

    const filteredAlbums = useMemo(() => {
        if (!keyword) return albums;

        // filter by album title 
        const filteredByTitle: Album[] = albums.filter(album =>
            album.title.toLowerCase().includes(keyword.toLowerCase()))

        // filter by user name
        const userIds: number[] = users.filter(user => {
            return user.name.toLowerCase().includes(keyword.toLowerCase())
        })?.map(user => user.id)
        const filteredByName: Album[] = albums.filter(album => userIds.includes(album.userId))

        return union(filteredByTitle, filteredByName)
    }, [albums, keyword, users])

    let debounce: NodeJS.Timeout | null;
    const handleFilterTitle = (e: FormEvent<HTMLInputElement>) => {
        if (debounce) clearTimeout(debounce)
        const value = e.currentTarget?.value;

        // wait until 500s to do filtering
        debounce = setTimeout(() => {
            setKeyword(value || '');
            debounce = null
        }, 500);
    }

    return <div className="home">
        <div className="home__header">
            <input
                onInput={handleFilterTitle}
                className="home__filter"
                placeholder="Filter album title or user name here" />
            <Link to="/favorites" className="home__favorite">My Favorite</Link>
        </div>

        <div className="home__albums">
            {filteredAlbums.map(album =>
                <AlbumCard
                    key={album.id}
                    className="home__album"
                    id={album.id}
                    keyword={keyword}
                    title={album.title}
                    userName={users.find(user => user.id === album.userId)?.name || ''} />
            )}
        </div>
    </div>
}
export default Home;