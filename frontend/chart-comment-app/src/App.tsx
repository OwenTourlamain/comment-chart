import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'
import { DataPoint, CommentType } from './components/Types'

function App() {

  function addComment(username: string, text: string): void {
    const id = Math.floor(Math.random() * 10000) + 1
    const newComment = { 
      username: username,
      text: text, 
      id: id, 
      datapoint: selectedID 
    }
    setComments([...comments, newComment])
    fetch('http://localhost:8000/comments/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .catch((err) => console.log('error'))
  }

  function selectDataPoint(id: number) {
    setSelectedID(id)
  }

  const [data, setData] = useState<DataPoint[]>([])
  const [comments, setComments] = useState<CommentType | any>([])
  const [selectedID, setSelectedID] = useState(-1)

  useEffect(() => {
    fetch('http://localhost:8000/data/')
       .then((response) => response.json())
       .then((json) => {
          setData(json.datapoints.map((d: any) => (
            { 
              x: d.x, 
              y: d.y, 
              commentCount: d.comment_count 
            }
        )));
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/comments/')
       .then((response) => response.json())
       .then((json) => {
          setComments(json.comments.map((d: any) => (
            { 
              id: d.id, 
              username: d.username, 
              text: d.text,
              datapoint: d.datapoint
            }
        )));
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  useEffect(
    () => setData(data.map(
      (datum) => (
        { 
          x: datum.x, 
          y: datum.y, 
          commentCount: comments.filter((comment: CommentType) => comment.datapoint === datum.x).length
        }
      )
    )),
    [comments]
  )

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
