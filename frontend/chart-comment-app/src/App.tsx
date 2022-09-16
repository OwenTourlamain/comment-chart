import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'

type DataPoint = {
  x: number,
  y: number,
  commentCount: number
}

type CommentType = {
  username: string,
  text: string,
  id: number,
  datapoint: number
}

function App() {
  function getData(): DataPoint[] {
    const data: DataPoint[] = []

    for (let i = 0; i < 15; i++) {
      data.push(
        {
          x: i,
          y: Math.floor(Math.random() * 100) + 1,
          commentCount: 3,
        }
      )
    }

    return data;
  }

  function getComments(): CommentType[] {
    return [
      {
        username: "Dave",
        text: "Nice data!",
        id: 1,
        datapoint: 1,
      },
      {
        username: "Sally",
        text: "Good work everyone",
        id: 2,
        datapoint: 1,
      },
      {
        username: "Mike",
        text: "This is concerning",
        id: 3,
        datapoint: 4,
      },
    ]
  }

  function addComment(username: string, text: string): void {
    const id = Math.floor(Math.random() * 10000) + 1
    const newComment = { 
      username: username,
      text: text, 
      id: id, 
      datapoint: selectedID 
    }
    console.log(newComment)
    setComments([...comments, newComment])
  }

  function selectDataPoint(id: number) {
    setSelectedID(id)
  }

  const [data] = useState<DataPoint[]>(getData())
  const [comments, setComments] = useState<CommentType | any>(getComments())
  const [selectedID, setSelectedID] = useState(-1)

  return (
    <div className='container'>
      <Header />
      <ChartBox data={data} onClick={selectDataPoint} />
      <CommentBox 
        comments={comments} 
        selectedID={selectedID} 
        onAddComment={addComment} 
        onCloseClick={setSelectedID}
      />
    </div>
  );
}

export default App;
