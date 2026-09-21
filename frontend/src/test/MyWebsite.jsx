import { useState } from "react";

const MyWebsite = () => {
  return (
    <div>
      <Header></Header>
      <Products></Products>
    </div>
  );
};

const Header = () => {
  return <h1>MyWebsite</h1>;
};

const Products = () => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const submitHandler = ({ name, desc, qty, price }) => {
    event.preventDefault();
    setProducts((prev) => [...prev, { name, desc, qty, price }]);
  };

  return (
    <div>
      <h1>List of Products</h1>
      <button
        onClick={() => {
          setFormIsOpen((prev) => !prev);
        }}
      >
        Create Product
      </button>

      {/* Conditional rendering */}
      {formIsOpen && <Form onSubmitHandler={submitHandler}></Form>}

      <div>
        {products.map((product) => (
          <div key={product.name}>
            <p>{product.name}</p>
            <p>{product.desc}</p>
            <p>{product.qty}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Form = ({ onSubmitHandler }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  return (
    <form
      action="#"
      onSubmit={() =>
        onSubmitHandler({
          name,
          desc,
          qty,
          price,
        })
      }
    >
      <input
        type="text"
        name="name"
        id=""
        placeholder="Name of product"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="desc"
        id=""
        placeholder="Description of product"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="number"
        name="qty"
        id=""
        placeholder="quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <input
        type="number"
        name="price"
        id=""
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default MyWebsite;
