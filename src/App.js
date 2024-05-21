import { useEffect, useState } from 'react';
import './App.css'
import Main from './main/main';
import Sidebar from './sidebar/sidebar';
import UsersPage from './main/usersPage/usersPage';

function App() {
  
  const [activeButton, setActiveButton] = useState(1)

  return (
    <div className='main_page_container'>
      <Sidebar active={activeButton} setActive={setActiveButton}></Sidebar>
      <Main>{<UsersPage activeButton={activeButton}></UsersPage>}</Main>
    </div>
  );
}

export default App;
