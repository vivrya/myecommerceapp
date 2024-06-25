import ProductCard from "../Common/ProductCard";

const Home = ({ products }) => {
  console.log("here", products.products);
  return (
    <div
      style={{
        display: "flex",
        width: "95%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginLeft: "40px",
      }}
    >
      {products.products?.map((prod, i) => {
        return <ProductCard key={prod.id} prod={prod} />;
      })}
    </div>
  );
};

export default Home;
