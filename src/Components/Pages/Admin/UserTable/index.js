const UserTable = () => {
    //Create a table
    //Create table headers
    let res

    //Map: create all rows based on user data
    {users &&
    users.map((user) => {
        return <p key={user.id}>{user.name}</p>;
    })}
    return(

    )
}

export default UserTable