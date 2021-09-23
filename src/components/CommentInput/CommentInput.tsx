import { KeyboardEventHandler, useRef } from "react";
import { CommentInputProps } from ".";


const CommentInput = ({ callback, photoId, className }: CommentInputProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            callback(photoId, event.currentTarget.value)
            if (inputRef.current) inputRef.current.value = ''
        }
    }
    return <input ref={inputRef} onKeyDown={handleSubmit} className={className} placeholder="Comment here.." />
}

export default CommentInput;