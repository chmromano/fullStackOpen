import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";

const UserRow = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(({ users }) => users);

  console.log(users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td />
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
