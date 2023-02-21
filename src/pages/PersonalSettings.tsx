import { Link } from 'react-router-dom'
import DefaultContainerData from '../components/DefaultContainerData'

const PersonalSettings=()=>{
  return(
    <DefaultContainerData>
      <ul className='list-disc pl-3'>
        <li>
          <Link
            className='hover:text-btn'
            to='changePassword'
          >
            Change user password
          </Link>
        </li>
      </ul>
    </DefaultContainerData>
  )
}

export default PersonalSettings