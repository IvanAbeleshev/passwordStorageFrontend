import axios from 'axios'
import React, {useState, useRef, MutableRefObject, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../common'
import Button from '../components/Button'
import { BACKEND_URL } from '../constans'
import { currentUserState } from '../store/authSlice'
import styles from '../styles/pages/employeeItem.module.css'

export interface IDataEmployee{
    id?: number,
    name: string,
    jobTitle?: string,
    employmentDate?: Date,
    dismissDate?: Date,
    img?: string,
    comment?:string
}

enum componentMode{
    create = 'create',
    change = 'change'
}

const EmployeeItem=()=>{
    const [currentMode, setCurrentMode] = useState(componentMode.create)
    const [currentImg, setCurrentImg] = useState('/img/NoImage.jpg')
    const [data, setData]:[IDataEmployee, Function] = useState({} as IDataEmployee)
    const inputElement = useRef() as MutableRefObject<HTMLInputElement>

    const {id} = useParams()
    const navigator = useNavigate()
    const userState = useSelector(currentUserState)

    useEffect(()=>{
        if(id !== 'new' && id){
            setCurrentMode(componentMode.change)
        
            axiosInstance.get(`/employees/getOne?id=${id}`, {headers: {'Content-Type': 'multipart/form-data'}}).then(resultRequest=>{
                const dataRequest = resultRequest.data.data
                delete dataRequest.createdAt
                delete dataRequest.updatedAt

                setData(dataRequest)
                if(dataRequest.img){
                    setCurrentImg(`${BACKEND_URL}/${dataRequest.img}`)
                }
            })
        }
    },[id])

    const getFormData=():FormData=>{
        const formData = new FormData()
        if(inputElement.current.files && inputElement.current.files.length>0){
            formData.append('img', inputElement.current.files[0])
        }
        type Activity = typeof data

        for(let i in data){
            if(i==='img'){
                continue
            }
            if(!data[i as keyof Activity] || data[i as keyof Activity] === null ){
                continue
            }
            formData.append(i, String(data[i as keyof Activity]))
        }
    
        return formData
    }

    const fulFillRequest=(apiPath: string)=>{
        const formData = getFormData()

        axiosInstance.post(`${apiPath}`, formData, {headers: {'Content-Type': 'multipart/form-data'}} ).then(resultRequest=>{navigator(-1)}).catch(error=>{alert('Request failed')})
    }

    const imgSelector:React.ChangeEventHandler=(event)=>{
        const files = (event.target as HTMLInputElement).files
        if(files?.length){
            setCurrentImg(URL.createObjectURL(files[0]))
        }
    }

    const handlerOnChange:React.ChangeEventHandler=(event)=>{
        const target = event.target as HTMLInputElement

        setData({...data, [target.name]:target.value})
    }

    const createNewElement=()=>{
        fulFillRequest('/employees/createOne')  
    }

    const saveChanges=()=>{
        fulFillRequest(`/employees/changeOne?id=${id}`)
    }

    const dateValue=(incomeDate:string|Date|undefined|null):string|undefined=>{
        if(incomeDate === undefined){
            return undefined
        }

        if(typeof incomeDate === 'string'){
            return incomeDate.slice(0, 10)
        }

        if (incomeDate instanceof Date) {
            return `${incomeDate.getFullYear()}-${incomeDate.getMonth()}-${incomeDate.getDay()}`
        }
        
        return undefined
    }
    return(
        <div>
            <form className={styles.wrapper}>
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={data.name} onChange={handlerOnChange} />
                </div>
                
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="jobTitle">Job title</label>
                    <input type="text" name="jobTitle" id="jobTitle" value={data.jobTitle} onChange={handlerOnChange} />
                </div>
                
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="employmentDate">Employment date</label>
                    <input type="date" name="employmentDate" id="employmentDate" value={dateValue(data.employmentDate)} onChange={handlerOnChange} />
                </div>

                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="dismissDate">Dismiss date</label>
                    <input type="date" name="dismissDate" id="dismissDate" value={dateValue(data.dismissDate)} onChange={handlerOnChange} />
                </div>

                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="img">Photo</label>
                    <input type="file" name="img" id="img" onChange={imgSelector} ref={inputElement}  />
                </div>

                <div className={styles.pairsLabelAndInput} style={{display: 'flex', justifyContent:'center'}}>
                    <img className={styles.previewImg} src={currentImg} alt="preview" />
                </div>

                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="comment">Comment</label>
                    <input type="text" name="comment" id="comment" value={data.comment} onChange={handlerOnChange} />
                </div>

                {currentMode === componentMode.create?
                    <Button onClick={createNewElement}>Create</Button>:
                    <Button onClick={saveChanges}>Save changes</Button>
                }
            </form>
        </div>
    )
}

export default EmployeeItem