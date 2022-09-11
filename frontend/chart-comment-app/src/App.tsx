import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'

function App() {
  function getData() {
    const data = [];

    for (let i = 0; i < 15; i++) {
      data.push(
        {
          x: i,
          y: Math.floor(Math.random() * 100) + 1,
          id: i,
        }
      )
    }

    return data;
  }

  const data = getData();

  return (
    <div className='container'>
      <Header />
      <ChartBox data={data}/>
      <CommentBox />
    </div>
  );
}

export default App;
