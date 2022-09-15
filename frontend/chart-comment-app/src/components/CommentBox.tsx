import AddComment from './AddComment'
import Comment from './Comment'

type Props = {
    comments: Comment[],
    isSelected: boolean,
    selectedID: number,
    onAddComment: Function,
}

type Comment = {
    username: string,
    text: string,
    id: number,

}

const CommentBox = ({ comments, selectedID, isSelected, onAddComment }: Props) => {

    function renderComments(comments: Comment[]) {
        return (
            <>
                {comments.map((comment) => (
                    <Comment key={comment.id} username={comment.username} text={comment.text}/>
                ))}
                <AddComment onAddComment={onAddComment}/>
            </>
        )
    }

    return (
        <div className="commentBox">
            {isSelected ? // have we clicked on a data point?
                renderComments(comments)
            :
                <h3>Select a data point to see comments</h3>
            }
        </div>
    )
}

export default CommentBox