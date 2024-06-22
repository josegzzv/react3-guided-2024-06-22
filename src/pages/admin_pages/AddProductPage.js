import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, FormGroup, Form, Dropdown, Image, Container } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";

const AddProductPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageData, setImageData] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [selectedCategoryName, setSelectedCategoryName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  console.log(categories);

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    const selectedCategory = categories.filter((category)=>category.id==categoryId);
    setSelectedCategoryName(selectedCategory[0].name)
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleImageDataChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageData(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const createProductHandler = (event) => {
    event.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name: name,
      description: description,
      image: imageData,
      category: parseInt(category),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      rating : {"rate":0, "count":0},
    };
    products.push(newProduct);
    try{
      localStorage.setItem("products", JSON.stringify(products));
      setSuccess("Product is created successfully");
    }
    catch(Exception){
      setError("Could not save product");
      console.log(error);
    }
  };

  return (
    <>
      <LinkContainer to="/admin/products">
        <Button variant="primary" className="my-3">
          Show Products List
        </Button>
      </LinkContainer>
      {success && <AlertMessage variant="success" message={success} />}
      {error && <AlertMessage variant="danger" message={error}/>}
          
      <Container>
        {imageData && (
          <div className="text-center">
            <Image src={imageData} width={200} height={200} rounded></Image>
          </div>
        )}
      </Container>
      <Form onSubmit={createProductHandler}>
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => handleNameChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="description" className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="price" className="my-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            min={0}
            placeholder="Enter Price"
            value={price}
            onChange={(e) => handlePriceChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="quantity" className="my-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min={0}
            placeholder="Enter Quantity In Stock"
            value={quantity}
            onChange={(e) => handleQuantityChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Dropdown onSelect={(eventKey) => handleCategoryChange(eventKey)}>
            <Dropdown.Toggle variant="primary" id="category">
              {selectedCategoryName? selectedCategoryName:"Select Category"}
            </Dropdown.Toggle>
          
          <Dropdown.Menu >
            {categories.length > 0 &&
              categories.map((category) => (
                
                <Dropdown.Item key={category.id} eventKey={category.id}>
                  {category.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
          </Dropdown>
        </FormGroup> 
        <FormGroup controlId="image" className="my-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleImageDataChange(e)}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          {" "}
          Add Product{" "}
        </Button>
      </Form>
    </>
  );
};

export default AddProductPage;
