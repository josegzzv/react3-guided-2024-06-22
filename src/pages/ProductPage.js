import { Image } from "react-bootstrap";
import { useParams } from "react-router";
const ProductPage = () => {
    const params = useParams()
    console.log('params', params)
    const id = Number(params.id)
    const localProducts = localStorage.getItem('products')
    const products = JSON.parse(localProducts)
    const product = products.find(product => product.id === id)
    console.log('product', product)
    return (
        <>
            <h2>Product {params.id}</h2>
            <Image src={product.image} width={300} height={300} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
        </>
    )
};

export default ProductPage;
