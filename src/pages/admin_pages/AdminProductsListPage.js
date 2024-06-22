import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../../components/AlertMessage";

const AdminProductsListPage = () => {
  const [products, setProducts] = React.useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const deleteProductHandler = (id) => {
    const productsLeft = products.filter((product) => product.id !== id);
    setProducts(productsLeft);
  };

  function fetchCategoryName(id) {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoryObject = categories.find(
      (category) => category.id === parseInt(id)
    );
    return categoryObject.name;
  }
  return (
    <>
    {products.length == 0 && (
        <AlertMessage variant="info" message="No product created" />
      )}
      {/* <Container> */}
      <LinkContainer to="/admin/product/new">
        <Button variant="primary" className="my-3">
          Add Product
        </Button>
      </LinkContainer>
      <Table striped hover bordered className="table-sm">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Description</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Stock Left</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  rounded
                ></Image>
              </td>
              <td>{product.description}</td>
              <td>{fetchCategoryName(product.category)}</td>

              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <LinkContainer to={`/admin/product/${product.id}/edit`}>
                  <Button variant="info" className="mb-3">
                    Edit
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="mb-3"
                  onClick={() => deleteProductHandler(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* </Container> */}
    </>
  );
};

export default AdminProductsListPage;
