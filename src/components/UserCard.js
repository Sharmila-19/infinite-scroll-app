import React from "react";

const UserCard =React.memo( ({ user }) => {
    return(
        <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
        </div>
    );
});
export default UserCard;