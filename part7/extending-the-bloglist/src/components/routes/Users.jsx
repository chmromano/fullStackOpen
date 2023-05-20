import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { initializeUsers } from "../../reducers/userReducer";

const UserRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch, users]);

  return (
    <>
      <h2>Users</h2>
      <Table striped>
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
      </Table>
    </>
  );
};

export default Users;
