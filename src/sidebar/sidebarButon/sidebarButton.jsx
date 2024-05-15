import './sidebarButton.css'

export default function SidebarButton({buttonName, buttonIcon, isActive, setActive, buttonId}){

    function setActiveButton(){
        setActive(buttonId)
    }

    
    return(
        <div className='sidebarButton_container' onClick={setActiveButton}
        style={isActive ? {backgroundColor: 'rgba(255, 255, 255, 0.50)'} : null}>
            <div className='button_icon' style={{backgroundImage: `url(${buttonIcon})`}}></div>
            <div className='button_name'>{buttonName}</div>
        </div>
    )
}