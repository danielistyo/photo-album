import { Link } from "react-router-dom";
import "./AlbumCard.scss";

type Props = { keyword?: string; title: string; userName: string; id: number; className: string }
const AlbumCard = ({ keyword, title, userName, id, className }: Props) => {
    let combinedTitle: string | JSX.Element = '';
    let combinedUsername: string | JSX.Element = '';

    if (keyword) {
        const titleArr = title.split(new RegExp(`(${keyword})`, "ig"))
        titleArr.forEach(str => {
            if (str.toLocaleLowerCase() === keyword.toLocaleLowerCase()) combinedTitle = <>{combinedTitle}<span className="album-photo--highlight">{str}</span></>
            else combinedTitle = <>{combinedTitle}{str}</>
        });
        const usernameArr = userName.split(new RegExp(`(${keyword})`, "ig"))
        usernameArr.forEach(str => {
            if (str.toLocaleLowerCase() === keyword.toLocaleLowerCase()) combinedUsername = <>{combinedUsername}<span className="album-photo--highlight">{str}</span></>
            else combinedUsername = <>{combinedUsername}{str}</>
        });
    } else {
        combinedTitle = title;
        combinedUsername = userName
    }

    return <Link to={`/album/${id}`} className={`${className} album-card`}>
        <div className="album-card__title">{combinedTitle}</div>
        <div className="album-card__author">
            by <div className="album-card__username">{combinedUsername}</div>
        </div>
    </Link>
}

export default AlbumCard;