import React from "react";
import UserCard from "./UserCard";

const UserList=React.memo(({users})=>{
    return(
        <div>
            {users.map(user =>(
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
});
export default UserList;