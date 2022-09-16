import AddComment from './AddComment'
import Comment from './Comment'

type Props = {
    comments: CommentType[],
    selectedID: number,
    onAddComment: Function,
    onCloseClick: Function,
}

type CommentType = {
    username: string,
    text: string,
    id: number,
    datapoint: number
}

const CommentBox = ({ comments, selectedID, onAddComment, onCloseClick }: Props) => {

    function renderComments(comments: CommentType[]) {
        return (
            <>
                <div className='commentHeader'>
                    <h3>Showing comments for data point {selectedID}:</h3>
                    <button className='closeButton' onClick={() => onCloseClick(-1)}>Close</button>
                </div>
                {comments.filter((comment) => comment.datapoint === selectedID).map((comment) => (
                    <Comment key={comment.id} username={comment.username} text={comment.text}/>
                ))}
                <AddComment onAddComment={onAddComment}/>
            </>
        )
    }

    return (
        <div className="commentBox">
            {selectedID >= 0 ? // have we clicked on a data point?
                renderComments(comments)
            :
                <h3>Select a data point to see comments</h3>
            }
        </div>
    )
}

export default CommentBox