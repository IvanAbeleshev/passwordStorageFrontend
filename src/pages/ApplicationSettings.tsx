import { Link } from "react-router-dom"
import DefaultContainerData from "../components/DefaultContainerData"

const ApplicationSettings=()=>{
  return(
    <DefaultContainerData>
      <ul className='list-disc pl-3'>
        <li>
          <Link
            className='hover:text-btn'
            to='passwordGeneratorSetting'
          >
            Password generator settings
          </Link>
        </li>
      </ul>
    </DefaultContainerData>
  )
}

export default ApplicationSettings