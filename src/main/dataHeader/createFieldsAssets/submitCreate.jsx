import './submitCreate.css'

export default function SubmitCreate({onClick, text}){
    return(
        <div className='submitCreate_container' onClick={onClick}>{text}</div>
    )
}