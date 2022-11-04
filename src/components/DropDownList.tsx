import { BACKEND_URL } from '../constans'
import styles from '../styles/components/dropDownList.module.css'

interface IPropsDropDownList{
    rows: {
        id: number,
        img?: string,
        name: string,
        jobTitle?: string
    }[] | undefined,
    count: number,
    maxCount: number,
    selectectFunction: Function
}

const DropDownList=({rows, count, maxCount, selectectFunction}:IPropsDropDownList)=>{

    return(
        <ul className={styles.lictContainer}>
            {rows?rows.slice(0, maxCount).map(element=>
                <li className={styles.itemContainer} onClick={selectectFunction(element.id, element.name)}>
                    <img className={styles.img} src={element.img?`${BACKEND_URL}/${element.img}`:'/img/NoImage.jpg'} alt="img" />
                    <h6 className={styles.nameBox}>{element.name}</h6>
                    {element.jobTitle?<h6>{element.jobTitle}</h6>:<></>}
                </li>
                ):<></>}
            {count>maxCount&&<li className={styles.itemContainer}>and {count-maxCount} elements</li>}
        </ul>
    )
}

export default DropDownList