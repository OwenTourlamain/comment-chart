import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'

type DataPoint = {
  x: number,
  y: number,
  id: number
}

type Series = {
  label: string,
  data: DataPoint[]
}

type Comment = {
  username: string,
  text: string,
  id: number,
  datapoint: number
}

function App() {
  function getData(): Series[] {
    const series: Series = {
      label: "Test Data",
      data: []
    }

    for (let i = 0; i < 15; i++) {
      series.data.push(
        {
          x: i,
          y: Math.floor(Math.random() * 100) + 1,
          id: i
        }
      )
    }

    return [series];
  }

  function getComments(): Comment[] {
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

  function addComment(username: string, text: string, datapoint: number): void {
    const id = Math.floor(Math.random() * 10000) + 1
    const newComment = { username, text, id, datapoint }
    setComments([...comments, newComment])
  }

  const [data, setData] = useState<DataPoint | any>(getData())
  const [comments, setComments] = useState<Comment | any>(getComments())

  return (
    <div className='container'>
      <Header />
      <ChartBox data={data} />
      <CommentBox comments={comments} selectedID={1} isSelected={true} onAddComment={addComment}
        />
    </div>
  );
}

export default App;
