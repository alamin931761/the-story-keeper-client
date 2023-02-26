import React from 'react';

const User = ({ user, index }) => {
    const { email } = user;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
        </tr>
    );
};

export default User;