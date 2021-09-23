import { Link } from "react-router-dom";

type Props = { username: string; userId: number; email: string; className: string }
const AlbumUser = ({ username, email, userId, className }: Props): JSX.Element => {
    return <Link to={`/user/${userId}`} className={className}><div><strong>{username}</strong> | {email}</div></Link>
}

export default AlbumUser