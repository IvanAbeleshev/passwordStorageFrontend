import axios from 'axios'
import { MutableRefObject, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { searchMode } from '../interfaces'
import { currentUserState } from '../store/slice'
import DropDownList from './DropDownList'

interface IData{
    value: string | undefined,
    selectedId: number | undefined,
    count?: number,
    rows?: {
        id: number,
        img?: string,
        name: string,
        jobTitle?: string
    }[]
}

interface IPropsInputSelect{
    mode: searchMode
}

const InputSelect=({mode}:IPropsInputSelect)=>{

    const [selectedData, setSelectedData] = useState({} as IData)
    const [timeoutId, setTimeoutId]:[undefined|string, Function] = useState()
    const refInput = useRef() as MutableRefObject<HTMLInputElement>
    
    const userState = useSelector(currentUserState)

    const sendRequest=(value: string)=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }

        try{
            axios.get(`${BACKEND_URL}/${mode}s?page=1&limit=${LIMIT_ITEMS_ON_PAGE}${value?`&searchString=${value}`:''}`, config).then(result=>{
                if(result.status === 200){
                    setSelectedData({...selectedData, selectedId: undefined, value, count: result.data.data.count, rows: result.data.data.rows})
                }
            })
        }catch(error){
            setSelectedData({...selectedData, value})    
        }
        
    }

    const handleOnChange:React.ChangeEventHandler=(event)=>{
        const {value} = event.target as HTMLInputElement
        
        setSelectedData({...selectedData, value, selectedId: undefined})
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        setTimeoutId(
            setTimeout(() => {
                sendRequest(value)    
            }, 800)
        )
    }

    const selectFunction=(selectedId: number, value: string)=>{
        const clickBox:React.MouseEventHandler=(event)=>{
            setSelectedData({...selectedData, selectedId, value })
        }
        return clickBox
    }
    
    const getVision=():boolean=>{
        
        if(selectedData.value && selectedData.count && !selectedData.selectedId && refInput.current === document.activeElement){
            return true
        }

        return false
    }

    return <div>
    <input type="text" name={mode} id={mode} value={selectedData.value} onChange={handleOnChange} ref={refInput} />
    <div>
    {getVision()&&<DropDownList mode={mode} rows={selectedData.rows} count={selectedData.count as number} maxCount={5} selectectFunction={selectFunction} />}
    </div>
</div>
}

export default InputSelect