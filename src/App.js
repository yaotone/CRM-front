import { useEffect, useState } from 'react';
import './App.css'
import Main from './main/main';
import Sidebar from './sidebar/sidebar';
import UsersPage from './main/usersPage/usersPage';

function App() {
  
  const [currMainPage, setCurrMainPage] = useState(<UsersPage></UsersPage>)
  const [activeButton, setActiveButton] = useState(1)

  useEffect(()=>{
    if(activeButton === 1){
      setCurrMainPage(<UsersPage></UsersPage>)
    }
    else{
      setCurrMainPage(<></>)
    }
  }, [activeButton])

  return (
    <div className='main_page_container'>
      <Sidebar active={activeButton} setActive={setActiveButton}></Sidebar>
      <Main>{currMainPage}</Main>
    </div>
  );
}

export default App;
