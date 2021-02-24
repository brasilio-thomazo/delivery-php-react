import React from "react";

const numberFormat = (value) => {
  console.log(value, typeof value);
  if (!/^[\d\.]+$/.test(value)) {
    return "";
  }
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Products = ({ products, onDelete, onEdit }) => {
  function handleDelete(id) {
    if (typeof onDelete !== "function") return;
    onDelete(id);
  }

  function handleEdit(data) {
    if (typeof onEdit !== "function") return;
    onEdit(data);
  }

  return (
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
              <td>{product.type.name}</td>
              <td>{product.category.name}</td>
              <td>{product.description}</td>
              <td>{numberFormat(product.cost)}</td>
              <td>{numberFormat(product.price)}</td>
              <td>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleEdit(product)}>
                  <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleDelete(product.id)}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Products;
