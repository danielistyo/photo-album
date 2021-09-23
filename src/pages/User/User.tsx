import { useContext } from "react";
import { useParams } from "react-router";
import AlbumCard from "../../components/AlbumCard";
import { anyStore as storeContext, ProviderProps } from "../../store";
import './User.scss';

const User = (): JSX.Element => {
    const { state: { users, albums } } = useContext<ProviderProps>(storeContext);
    const { id } = useParams<{ id: string }>();

    const user = users.find(user => user.id === parseInt(id, 10))
    if (!user) return <div>No User Found</div>

    const userAlbums = albums.filter(album => album.userId === user.id)

    return <div className="user-page">
        <h5>Author</h5>
        <div className="user-page__name">{user.name}</div>
        <div className="user-page__phone">{user.phone}</div>
        <div className="user-page__email">{user.email}</div>
        <div className="user-page__subtitle">Address</div>
        <div className="user-page__address">
            {`${user.address.street} ${user.address.suite} ${user.address.suite}`}
        </div>
        <div className="user-page__subtitle">City</div>
        <div className="user-page__address">{user.address.city}</div>
        <div className="user-page__subtitle">Company</div>
        <div className="user-page__company">{user.company.name}</div>
        <div className="user-page__subtitle">Website</div>
        <div className="user-page__website">{user.website}</div>
        <h5>Albums</h5>
        <div className="user-page__albums">
            {userAlbums.map(album =>
                <AlbumCard
                    key={album.id}
                    className="home__album"
                    id={album.id}
                    title={album.title}
                    userName={users.find(user => user.id === album.userId)?.name || ''} />)}
        </div>
    </div>
}
export default User;