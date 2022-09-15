import { useState } from 'react'

type Props = {
    onAddComment: Function
}

const AddComment = ({ onAddComment }: Props) => {

    const [username, setUsername] = useState('');
    const [text, setText] = useState('');

    const onSubmit = (e: any) => {
        e.preventDefault()

        if(!username) {
            alert('Please add a task')
            return
        }

        onAddComment(username, text)

        setUsername('')
        setText('')
    }

    return (
        <div className="addComment">
            <form className="commentForm" onSubmit={onSubmit}>
                <textarea className="textBox" placeholder='Add a comment...' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <div className='lowerContainer'>
                    <input className="usernameBox" type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type='submit' value='Post Comment' className="button"/>
                </div>
            </form>
        </div>
    )
}

export default AddComment