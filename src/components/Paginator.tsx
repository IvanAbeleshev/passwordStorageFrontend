import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

interface iPropsPaginator{
  countPages: number,
  currentPage: number,
  onChange: Function
}

interface iPagesItem{
  id:number,
  title: string,
  path: number
}

const Paginator=({countPages, currentPage, onChange }:iPropsPaginator)=>{
  const [listPages, setListPages]:[iPagesItem[], Function] = useState([])

  useEffect(()=>{
    const tempPagesList: iPagesItem[]= []
    if(countPages<=9){
      for(let i=0; i<countPages; i++){
        tempPagesList.push({id: i, title: String(i+1), path: i+1})
      }
    }else{
      if(currentPage<=5){
        for(let i=0; i<7; i++){
          tempPagesList.push({id: i, title: String(i+1), path: i+1})
        }
        tempPagesList.push({id: 7, title: '...', path: 7})
        tempPagesList.push({id: 8, title: String(countPages), path: countPages})
      }

      if(currentPage>=countPages-5){
        tempPagesList.push({id: 0, title: '1', path: 1})
        tempPagesList.push({id: 1, title: '...', path: countPages-7})
        for(let i=0; i<7; i++){
          tempPagesList.push({id: i+2, title: String(countPages-6+i), path: countPages-6+i})
        }
      }

      if(currentPage>5 && currentPage<countPages-5){
        tempPagesList.push({id: 0, title: '1', path: 1})
        tempPagesList.push({id: 1, title: '...', path: currentPage-3})

        for(let i=0; i<5; i++){
          tempPagesList.push({id: i+2, title: String(currentPage-2+i), path: currentPage-2+i})
        }

        tempPagesList.push({id: 7, title: '...', path: currentPage+3})
        tempPagesList.push({id: 8, title: String(countPages), path: countPages})
      }
    }
    setListPages(tempPagesList)
  },[currentPage, countPages])

  return (
  <>
  {countPages>1?
  <div 
    className='
      pt-10
      flex 
      flex-row 
      justify-center 
      items-center 
      w-[100%]'
  >
    {currentPage <= 1?
      <div  
        className='
          border 
          w-14 
          h-14 
          py-1.5 
          px-3 
          rounded-full 
          bg-gray-400 
          mr-10 
          flex 
          justify-center 
          items-center'
      >
        <LeftOutlined />
      </div>
      :
      <div 
        className='
          border 
          w-14 
          h-14
          py-1.5 
          px-3 
          mr-10
          rounded-full 
          bg-main
          text-hover
          hover:bg-hover
          hover:text-main
          hover:cursor-pointer          
          flex 
          justify-center 
          items-center'
        onClick={()=>onChange(currentPage-1)}
      >
        <LeftOutlined />
      </div>
    }

    <div className='flex flex-row gap-[15px]'>
      {listPages.map(element=>
      <div 
        onClick={()=>onChange(element.path)}
        className={`
          border 
          w-14 
          h-14
          py-1.5 
          px-3
          rounded-full 
          flex 
          justify-center 
          items-center
          ${currentPage===element.path?
            'bg-hover text-main':
            'bg-main text-hover hover:bg-hover hover:text-main hover:cursor-pointer'
          }`
        } 
        key={element.id} 
      >
        {element.title}
      </div>)
      }
    </div>

    {currentPage>=countPages?
      <div 
        className='
          border 
          w-14 
          h-14 
          py-1.5 
          px-3 
          rounded-full 
          bg-gray-400 
          ml-10 
          flex 
          justify-center 
          items-center'
      >
        <RightOutlined />
      </div>:
      <div 
        className='
          border 
          w-14 
          h-14
          py-1.5 
          px-3 
          ml-10
          rounded-full 
          bg-main
          text-hover
          hover:bg-hover
          hover:text-main
          hover:cursor-pointer
          flex 
          justify-center 
          items-center'
        onClick={()=>onChange(currentPage+1)}
      >
        <RightOutlined />
      </div>
    }
  </div>:
  <></>
  } 
  </>
  
  )
}

export default Paginator