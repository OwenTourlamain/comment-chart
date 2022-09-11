import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'

type DataPoint = {
  x: number,
  y: number,
}

type Series = {
  label: string,
  data: DataPoint[]
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
          y: Math.floor(Math.random() * 100) + 1
        }
      )
    }

    return [series];
  }

  const data = getData();
  const comments = [
    {
      username: "Dave",
      text: "Nice data!"
    },
    {
      username: "Sally",
      text: "Good work everyone"
    },
    {
      username: "Mike",
      text: "This is concerning"
    },
  ]

  return (
    <div className='container'>
      <Header />
      <ChartBox data={data} />
      <CommentBox comments={comments}/>
    </div>
  );
}

export default App;
