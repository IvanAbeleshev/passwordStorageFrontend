import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/components/bottomPagePanel.module.css'

interface IPropsBottomPageNavigator{
    currentPage: number,
    countOfElements: number,
    countElementOnPage: number,
    baseURL: string
}

const BottomPageNavigator=({currentPage, countOfElements, countElementOnPage, baseURL }:IPropsBottomPageNavigator)=>{
    const [indexOfCurrentPage, setIndexOfCurrentPage] = useState(1)
    const navigator = useNavigate()
    
    const countOfPages = countOfElements/countElementOnPage===Math.trunc(countOfElements/countElementOnPage)?countOfElements/countElementOnPage:Math.trunc(countOfElements/countElementOnPage)+1 
    console.log(currentPage)
    let arrayOfPages:{id:number, title: number|string, path: number}[]
    if(countOfPages > 9){
        if(currentPage <=5){
            arrayOfPages = [
                {id:1, title: 1, path: 1},
                {id:2, title: 2, path: 2},
                {id:3, title: 3, path: 3},
                {id:4, title: 4, path: 4},
                {id:5, title: 5, path: 5},
                {id:6, title: 6, path: 6},
                {id:7, title: 7, path: 7},
                {id:8, title: '...', path: 8},
                {id:9, title: countOfPages, path: countOfPages}]
                setIndexOfCurrentPage(currentPage)
        }else if(currentPage>=countOfPages-5){
            arrayOfPages = [
                {id:1, title: 1, path: 1},
                {id:2, title: '...', path: countOfPages-7},
                {id:3, title: countOfPages-6, path: countOfPages-6},
                {id:4, title: countOfPages-5, path: countOfPages-5},
                {id:5, title: countOfPages-4, path: countOfPages-4},
                {id:6, title: countOfPages-3, path: countOfPages-3},
                {id:7, title: countOfPages-2, path: countOfPages-2},
                {id:8, title: countOfPages-1, path: countOfPages-1},
                {id:9, title: countOfPages, path: countOfPages}]
                setIndexOfCurrentPage(9-(countOfPages-currentPage))
        }else{
            arrayOfPages = [
                {id:1, title: 1, path: 1},
                {id:2, title: '...', path: currentPage-3},
                {id:3, title: currentPage-2, path: currentPage-2},
                {id:4, title: currentPage-1, path: currentPage-1},
                {id:5, title: currentPage, path: currentPage},
                {id:6, title: currentPage+1, path: currentPage+1},
                {id:7, title: currentPage+2, path: currentPage+2},
                {id:8, title: '...', path: currentPage+3},
                {id:9, title: countOfPages, path: countElementOnPage}]
                setIndexOfCurrentPage(5)
        }
    }else{
        let counter = 1
        arrayOfPages = []
        while(counter <= countOfPages){
            arrayOfPages.push({id:counter, title:counter, path: counter})
            counter++
        }
    }

    const clickOnPage=(path:number, index:number)=>{
        const handleOnClick:React.MouseEventHandler=()=>{
            setIndexOfCurrentPage(index)
            navigator(`${baseURL}${path}`)
        }

        return handleOnClick
    }

    const PagesStructure = 
    <div className={styles.wrapperPagesPanel}>
        {indexOfCurrentPage===1?
        <div className={`${styles.element} ${styles.elementDisable}`}>{'<'}</div>:
        <div onClick={clickOnPage(currentPage-1, indexOfCurrentPage-1)} className={`${styles.element} ${styles.elementStandart}`}>{'<'}</div>}
        

        <div className={styles.wrapperPages}>
            {arrayOfPages.map(element=>element.id===indexOfCurrentPage?
            <div className={`${styles.element} ${styles.elementActive}`} key={element.id}>{element.title}</div>:
            <div onClick={clickOnPage(element.path, element.id)} className={`${styles.element} ${styles.elementStandart}`} key={element.id}>{element.title}</div>)}
        </div>

        {indexOfCurrentPage===countOfPages?
        <div className={`${styles.element} ${styles.elementDisable}`}>{'>'}</div>:
        <div onClick={clickOnPage(currentPage+1, indexOfCurrentPage+1)} className={`${styles.element} ${styles.elementStandart}`}>{'>'}</div>
        }

    </div>

    return (<>
        {arrayOfPages.length>1?PagesStructure:<></>}
        </>
        )

}

export default BottomPageNavigator