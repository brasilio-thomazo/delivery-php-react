import React from "react";

const numberFormat = (value) => {
  console.log(value, typeof value);
  if (!/^[\d]$/.test(value)) {
    return "";
  }
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Products = ({ products }) => (
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>Descri&ccedil;&atilde;o</th>
          <th>(R$)Custo</th>
          <th>(R$)Venda</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.id_type}</td>
            <td>{product.id_category}</td>
            <td>{product.description}</td>
            <td>{numberFormat(product.cost)}</td>
            <td>{numberFormat(product.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default Products;
