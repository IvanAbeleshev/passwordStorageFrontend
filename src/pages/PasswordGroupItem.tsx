const PasswordGroupItem=()=>{
  return(
    <form className='flex flex-col'>
      <input type='text' name='name' id='name' placeholder='Name' />
      <input type='text' name='ownew' id='owner' placeholder='Owner' />
      <input type='text' name='icon' id='icon' placeholder='Icon' />
    </form>
  )
}

export default PasswordGroupItem