import axios from 'axios'
import { stringify } from 'querystring'
import React, {useState, useRef, MutableRefObject} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { BACKEND_URL } from '../constans'
import { currentUserState } from '../store/slice'
import styles from '../styles/pages/employeeItem.module.css'

interface IData{
    name: string,
    jobTitle?: string,
    employmentDate?: Date,
    dismissDate?: Date,
    img?: string,
    comment?:string

}

const EmployeeItem=()=>{
    const [currentImg, setCurrentImg] = useState('/img/NoImage.jpg')
    const [data, setData]:[IData, Function] = useState({} as IData)
    const inputElement = useRef() as MutableRefObject<HTMLInputElement>;

    const navigator = useNavigate()
    const userState = useSelector(currentUserState)

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

                <Button onClick={createNewElement}>Create</Button>
            </form>
        </div>
    )
}

export default EmployeeItem