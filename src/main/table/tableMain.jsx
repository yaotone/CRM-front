import './tableMain.css'
import menu from '../../icons/menu.png'
import { useState, useRef, useEffect } from 'react';
import deleteIcon from '../../icons/delete.png'
import edit from '../../icons/edit-line.png'
import check from '../../icons/check.svg'
import cross from '../../icons/white-cross.svg'

function TableMain({infoRow, indexes, colors}){
    let colorIndex = -1;
    let info =[]

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDeleteOptionsShown, setIsDeleteOptionsShown] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const menuRef = useRef(null)

    for (let key in infoRow){
        info.push(infoRow[key])
    }

    function handleMenuOpen(){
        setIsMenuOpen(!isMenuOpen)
    }

    function handleChange(){

    }

    function handleDelete(){
        setIsDeleted(true)
    }

    function handleDeleteButton(){
        setIsDeleteOptionsShown(!isDeleteOptionsShown)
    }

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
                setIsDeleteOptionsShown(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    return(
        <>
            { !isDeleted && <tr className='tableMain_row'> 
                {info.map((item, index)=>{
                    if(indexes?.includes(index)){ 
                        colorIndex += 1
                        return <td style = {{color: `${colors[colorIndex]}`}} className='tableMain_cell'>{item}</td>}
                    else{
                        return <td className='tableMain_cell'>{item}</td>}
                    }
                )
            }
            <td className='tableMain_cell'>
                <div className='table_action_wrapper'>
                    <img src={menu} alt="table-action" onClick={handleMenuOpen} className='table_action_icon'/>
                    <div className={isMenuOpen ? 'popup_menu' : 'closed_menu'} ref={menuRef}>
                        <div className='popup_menu_button' onClick={handleChange}>
                            <img src={edit} alt="edit" className='popup_menu_button_icon'/>
                            <div className='popup_menu_button_text'>Изменить</div>
                        </div>
                        <div className='popup_menu_button' onClick={handleDeleteButton}>
                            <img src={deleteIcon} alt="delete" className='popup_menu_button_icon'/>
                            <div className='popup_menu_button_text'>{isDeleteOptionsShown ? 'Удалить?' : 'Удалить'}</div>
                            {
                                isDeleteOptionsShown && <>
                                <div className='delete_option' id='delete'><img src={check} alt="check" onClick={handleDelete}/></div>
                                <div className='delete_option' id='cancel' onClick={handleDeleteButton}>
                                    <img src={cross} alt="cross" /></div></> 
                            }
                        </div>
                    </div>
                </div>
            </td>
            </tr>}
        </>
    )
}

export default TableMain