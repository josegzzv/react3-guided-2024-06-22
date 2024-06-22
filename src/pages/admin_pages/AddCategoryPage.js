import React from "react";
import {Container, Form, Button} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import AlertMessage from "../../components/AlertMessage";
import { useNavigate } from "react-router";

const AddCategoryPage = () => {
  const navigate = useNavigate()
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleNameChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setError("");
    setSuccess("");
    setDescription(e.target.value);
  };

  const addCategoryhandler = (e) => {
    e.preventDefault();
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

    const category = {
      id: categories.length + 1,
      name: name,
      description: description,
    }

    categories.push(category);
    try {
      localStorage.setItem("categories", JSON.stringify(categories));
      setSuccess("Category is added successfully");
      navigate('/categories')
    }
    catch (Exception) {
      setError("Could not save category");
    }
  }

  return (
    <>
      <Container>
        {error && <AlertMessage variant="danger" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
        <LinkContainer to='/categories'>
          <Button variant="primary" className="my-3">Categories List</Button>
        </LinkContainer>

        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Category Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Category Description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={addCategoryhandler}
          >
            Add Category
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddCategoryPage;
