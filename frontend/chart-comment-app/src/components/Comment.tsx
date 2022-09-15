type Props = {
    username: string,
    text: string,
}

const Comment = ({ username, text }: Props) => {
  return (
    <div className="comment">
        <strong>{username}</strong>
        <p>{text}</p>
    </div>
  )
}

export default Comment