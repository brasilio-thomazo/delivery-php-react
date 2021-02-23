import React from "react";
import Layout from "../../layouts/app";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import FormModal from "../../components/formModal";

interface Product {
  id: number;
  name: string;
  id_type: number;
  id_category: number;
  description: any;
  cost: number;
  price: number;
}

interface ProductType {
  id: number;
  name: string;
}

interface Properties {
  products: Array<Product>;
  p_types: Array<ProductType>;
  p_categories: Array<any>;
}

const Products: React.FC<Properties> = (props: Properties) => {
  console.log(usePage().props);
  //const { errors } = usePage().props;
  const errors = {
    name: undefined,
    id_type: undefined,
    id_category: undefined,
    cost: undefined,
    price: undefined,
  };

  const onTypeSubmit = (e: any) => {
    return;
  };

  return (
    <Layout title="Produtos::Optimus - Delivery v1.0.3">
      <React.Fragment>
        <form action="">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="name" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              {errors.name && (
                <div className="form-text text-danger">{errors.name}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="id_type" className="form-label">
                Tipo:
              </label>
              <div className="input-group">
                <select name="id_type" id="id_type" className="form-select">
                  {props.p_types.map((p_type, index) => (
                    <option key={index} value={p_type.id}>
                      {p_type.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_types"
                >
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
              <div className="form-text text-danger">
                {errors.id_type && (
                  <div className="form-text text-danger">{errors.name}</div>
                )}
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="id_category" className="form-label">
                Categoria:
              </label>
              <div className="input-group">
                <select
                  name="id_category"
                  id="id_category"
                  className="form-select"
                >
                  {props.p_categories.map((p_category, index) => (
                    <option key={index} value={p_category.id}>
                      {p_category.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_types"
                >
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
              <div className="form-text text-danger">
                {errors.id_category && (
                  <div className="form-text text-danger">{errors.name}</div>
                )}
              </div>
            </div>
          </div>
        </form>
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
              {props.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.id_type}</td>
                  <td>{product.id_category}</td>
                  <td>{product.description}</td>
                  <td>{product.cost}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FormModal
          onSubmit={onTypeSubmit}
          title="Tipos de produto"
          id="modal_type"
        >
          <p>Teste</p>
          <p>Teste 2</p>
        </FormModal>
      </React.Fragment>
    </Layout>
  );
};

export default Products;
