import './App.css'
import Main from './main/main';
import Sidebar from './sidebar/sidebar';

function App() {
  return (
    <div className='main_page_container'>
      <Sidebar></Sidebar>
      <Main></Main>
    </div>
  );
}

export default App;
