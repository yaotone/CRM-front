import './tableHead.css'

export default function TableHead({columns, hasIds}){
    return(
        <thead>
            <tr className='tableHead_row'>
                {hasIds && <th className='tableHead_cell' style={{textAlign: 'center'}}>id</th>}
                {columns.map((item)=>{
                    return <th className='tableHead_cell'>{item}</th>
                })}
                <th className='tableHead_cell'></th>
            </tr>
        </thead>
    )
}