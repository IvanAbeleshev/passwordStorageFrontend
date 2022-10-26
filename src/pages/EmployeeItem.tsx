const EmployeeItem=()=>{
    return(
        <div>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="jobTitle">Job title</label>
                <input type="text" name="jobTitle" id="jobTitle" />
                <label htmlFor="employmentDate">Employment date</label>
                <input type="date" name="employmentDate" id="employmentDate" />
                <label htmlFor="dismissDate">Dismiss date</label>
                <input type="date" name="dismissDate" id="dismissDate" />
                <label htmlFor="img">Photo</label>
                <input type="file" name="img" id="img" />
                <label htmlFor="comment">Comment</label>
                <input type="text" name="comment" id="comment" />
            </form>
        </div>
    )
}

export default EmployeeItem