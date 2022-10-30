import axios from 'axios'
import React, {useState, useRef, MutableRefObject, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { BACKEND_URL } from '../constans'
import { currentUserState } from '../store/slice'
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
        if(id !== 'new'){
            setCurrentMode(componentMode.change)
        
            const config = {
                headers: {
                'Authorization': 'Bearer ' + userState.token,
                'Content-Type': 'multipart/form-data'
                }
            }
            axios.get(`${BACKEND_URL}/employees/getOne?id=${id}`, config).then(resultRequest=>{
                if(resultRequest.status === 200){
                    console.log(resultRequest.data)
                    setData(resultRequest.data.data)
                    setCurrentImg(`${BACKEND_URL}/${data.img}`)
                }
            })
        }
    },[id])

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
        const formData = new FormData()
        if(inputElement.current.files && inputElement.current.files.length>0){
            formData.append('img', inputElement.current.files[0])
        }
        type Activity = typeof data

        for(let i in data){
            formData.append(i, String(data[i as keyof Activity]))
        }

        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token,
              'Content-Type': 'multipart/form-data'
            }
          }
        axios.post(`${BACKEND_URL}/employees/createOne`, formData, config ).then(result=>console.log(result))


        navigator(-1)
    }

    const saveChanges=()=>{

    }

    return(
        <div>
            <form className={styles.wrapper}>
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handlerOnChange} />
                </div>
                
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="jobTitle">Job title</label>
                    <input type="text" name="jobTitle" id="jobTitle" onChange={handlerOnChange} />
                </div>
                
                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="employmentDate">Employment date</label>
                    <input type="date" name="employmentDate" id="employmentDate" onChange={handlerOnChange} />
                </div>

                <div className={styles.pairsLabelAndInput}>
                    <label htmlFor="dismissDate">Dismiss date</label>
                    <input type="date" name="dismissDate" id="dismissDate" onChange={handlerOnChange} />
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
                    <input type="text" name="comment" id="comment" onChange={handlerOnChange} />
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