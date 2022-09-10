import './App.css';
import Header from './components/Header'
import ChartBox from './components/ChartBox'
import CommentBox from './components/CommentBox'

function App() {
  return (
    <div className='container'>
      <Header />
      <ChartBox />
      <CommentBox />
    </div>
  );
}

export default App;
