import { useEffect, useState } from 'react';
import './App.css'
import Main from './main/main';
import Sidebar from './sidebar/sidebar';

function App() {

  const [activeButton, setActiveButton] = useState(1)

  useEffect(()=>{
    
  }, [activeButton])

  return (
    <div className='main_page_container'>
      <Sidebar active={activeButton} setActive={setActiveButton}></Sidebar>
      <Main></Main>
    </div>
  );
}

export default App;
