import { useMemo } from "react"
import { LikeButtonProps } from "."


const LikeButton = ({ isLike, photoId, onClick, className }: LikeButtonProps): JSX.Element => {
    const source = useMemo<string>(() => {
        return isLike ? '/icons/like.webp' : '/icons/dislike.png'
    }, [isLike])

    const handleClick = () => {
        onClick(photoId, !isLike);
    }
    return <img src={source} alt="like" onClick={handleClick} className={className} />
}

export default LikeButton