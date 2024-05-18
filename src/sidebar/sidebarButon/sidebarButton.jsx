import './sidebarButton.css'

export default function SidebarButton({buttonName, buttonIcon, buttonAlternativeIcon, isActive, setActive, buttonId}){

    function setActiveButton(){
        setActive(buttonId)
    }

    
    return(
        // <div className='sidebarButton_container' onClick={setActiveButton}
        // style={isActive ? {backgroundColor: 'rgba(255, 255, 255, 0.50)'} : null}>
        <div className='sidebarButton_container' onClick={setActiveButton}
        style={isActive ? {backgroundColor: '#f8feff', color: '#435fe6'} : null}>
            <div className='button_icon' style={isActive ? {backgroundImage: `url(${buttonAlternativeIcon})`} :{backgroundImage: `url(${buttonIcon})`}}></div>
            <div className='button_name'>{buttonName}</div>
        </div>
    )
}