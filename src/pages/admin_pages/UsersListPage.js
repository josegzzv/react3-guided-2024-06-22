import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../../components/AlertMessage";

const UsersListPage = () => {
  const [users, setUsers] = React.useState(JSON.parse(localStorage.getItem("users")) || []);
  console.log(users);
  const deleteHandler = (id) => {
    const usersListUpdated = users.filter((user) => user.id != id);
    setUsers(usersListUpdated);
  };
  return (
    <>
      {users.length == 0 && (
        <AlertMessage variant="info" message="No users found" />
      )}
      {users.length > 0 && (
        <Container>
          <LinkContainer to="/admin/user/new">
            <Button variant="primary" className="my-3">Add User</Button>
          </LinkContainer>
          <Table striped hover bordered className="table-sm">
            <thead>
              <tr className="text-center">
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? "True" : "False"}</td>
                  <td>
                    <LinkContainer to={`/admin/user/${user.id}/edit`}>
                      <Button variant="info" className="mb-3">
                        Edit
                      </Button>
                    </LinkContainer>
                    </td>
                    <td>
                    <Button
                      variant="danger"
                      className="mb-3"
                      onClick={() => deleteHandler(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default UsersListPage;
