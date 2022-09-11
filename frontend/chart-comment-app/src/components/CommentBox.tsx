type Props = {
    comments: Comment[]
}

type Comment = {
    username: string,
    text: string,
}

const CommentBox = ({ comments }: Props) => {
  return (
    <div className="commentBox">
        {
            comments.map((comment) => (
                <div className="comment">
                    <h3>{comment.username}</h3>
                    <p>{comment.text}</p>
                </div>
            ))
        }
    </div>
  )
}

export default CommentBox