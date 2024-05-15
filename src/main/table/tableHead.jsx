import './tableHead.css'

export default function TableHead({columns}){
    return(
        <thead>
            <tr className='tableHead_row'>
                {columns.map((item)=>{
                    return <th className='tableHead_cell'>{item}</th>
                })}
                <th className='tableHead_cell'></th>
            </tr>
        </thead>
    )
}