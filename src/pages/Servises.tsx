import React from 'react'
import TableRow, { tableColumnType } from '../components/tableComponents/TableRow'

const Servises=()=>{
    //command panel + table is existanced data
    // in table mini image - name - full name - creation data
    return(
    <>
        <div className="containerCommandPanel">
            
        </div>
        <div className="containerTable">
            <table>
                <tr>
                    <TableRow data={['Img', 'Name', 'Full name', 'Creation data']} typeColumn={tableColumnType.head}></TableRow>    
                </tr>                
            </table>   
        </div>
        <h1>This is Servises PAGE!!!!</h1>
    </>
    )
}

export default Servises