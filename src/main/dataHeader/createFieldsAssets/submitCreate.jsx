import './submitCreate.css'

export default function SubmitCreate({onClick, text}){
    return(
        <input className='submitCreate_container' onClick={onClick} type='submit' value={text}></input>
    )
}