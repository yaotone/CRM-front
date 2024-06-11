import './mainHeader.css'
import { memo, useEffect, useRef, useState } from 'react'
import exit from '../../icons/exit.png'
import enter from '../../icons/enter.png'
import axios from 'axios'

import Input from '../dataHeader/createFieldsAssets/input'
import FieldInput from '../dataHeader/createFieldsAssets/fieldInput'
import SubmitCreate from '../dataHeader/createFieldsAssets/submitCreate'

const MainHeader = memo(function MainHeader({activeButton}){

    const login = useRef('')
    const password = useRef('')
    const [adminName, setAdminName] = useState('')

    const [isEnterFieldActive, setIsEnterFieldActive] = useState(false)

    function handleEnter(ev){
        ev.preventDefault()
        axios.post('/users/login',{
            username: `${login.current.value}`,
            password: `${password.current.value}`,
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(data=>{
            axios.defaults.headers.common = {'Authorization':`Bearer ${data.data.access_token}`}
            setAdminName((login.current.value).split('@')[0])
            localStorage.setItem('username', (login.current.value).split('@')[0])
            localStorage.setItem('access_key', data.data.access_token)
            setIsEnterFieldActive(false)
        })
        .catch(err=>console.log(err))
    }

    function handleExit(){
        axios.defaults.headers.common = {'Authorization': ` `}
        localStorage.setItem('username', '')
        localStorage.setItem('access_key', '')
        setAdminName('')
    }

    useEffect(()=>{
        if(localStorage.getItem('username') && localStorage.getItem('access_key')){
            axios.defaults.headers.common = {'Authorization':`Bearer ${localStorage.getItem('access_key')}`}
            setAdminName(localStorage.getItem('username'))
        }
    }, [])

    return(
        <div className='main_header'>
            <div className='contact_info'>Почта для обратной связи: bloodygamer1234@gmail.com</div>
            {/* {adminName && <div className='header_admin_img' style={{backgroundImage: `url(${admin})`}}></div>} */}
            {adminName && <div className='header_admin_name'>{adminName}</div>}
            <div className='header_vertical'></div>
            {adminName ? <div className='header_exit' style={{backgroundImage: `url(${exit})`}} onClick={handleExit}></div> :
            <div className='header_exit' style={{backgroundImage: `url(${enter})`}} onClick={()=>setIsEnterFieldActive(true)}></div>}
            {isEnterFieldActive &&             
            <div className='dataHeader_create_field_background' onClick={()=>setIsEnterFieldActive(false)}>
                <div className='dataHeader_create_field' onClick={(ev)=>ev.stopPropagation()}>
                    <FieldInput inputFieldName={'Редактирование'}
                        setIsActive={setIsEnterFieldActive}
                        inputs={[<Input key={1} ref={login} fieldName={'Логин'}></Input>,
                        <Input key={2} ref={password} fieldName={'Пароль'} type = {'password'}></Input>,
                        <SubmitCreate text={'ВОЙТИ'} onClick={handleEnter}></SubmitCreate>
                        ]}
                    ></FieldInput>
                </div>
            </div>}
        </div>
    )
})

export default MainHeader