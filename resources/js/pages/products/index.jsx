import React, { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import Layout from "../../layouts/app";
import { Inertia } from "@inertiajs/inertia";
import Products from "../../components/products";
import { ModalTypes } from "../../components/products/types";
import { ModalCategories } from "../../components/products/categories";
import { useFormik } from "formik";
import _ from "lodash";
import NumberFormat from "react-number-format";
import CurrencyInput from "react-currency-input-field";

export default ({ products, p_types, p_categories, errors }) => {
  const formik = useFormik({
    initialValues: {
      id: -1,
      name: "",
      id_type: -1,
      id_category: -1,
      description: "",
      cost: 0,
      price: 0,
    },
  });

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

  const { resetForm, handleSubmit, getFieldProps, values, handleChange, setFieldValue } = formik;

  return (
    <Layout title="Produtos::Optimus - Delivery v1.0.3">
      <React.Fragment>
        <form onSubmit={handleSubmit} onReset={resetForm}>
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="name" className="form-label">
                Nome:
              </label>
              <input type="text" id="name" className="form-control" {...getFieldProps("name")} />
              {errors.name && <div className="form-text text-danger">{errors.name}</div>}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="id_type" className="form-label">
                Tipo:
              </label>
              <div className="input-group">
                <select id="id_type" className="form-select" {...getFieldProps("id_type")}>
                  <option value="-1">Tipos</option>
                  {p_types.map((p_type, index) => (
                    <option key={index} value={p_type.id}>
                      {p_type.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_types"
                >
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
              <div className="form-text text-danger">
                {errors?.id_type && <div className="form-text text-danger">{errors.id_type}</div>}
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="id_category" className="form-label">
                Categoria:
              </label>
              <div className="input-group">
                <select id="id_category" className="form-select" {...getFieldProps("id_category")}>
                  <option value="-1">Categorias</option>
                  {p_categories.map((p_category, index) => (
                    <option key={index} value={p_category.id}>
                      {p_category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_categories"
                >
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
              <div className="form-text text-danger">
                {errors?.id_category && <div className="form-text text-danger">{errors.id_category}</div>}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="cost" className="form-label">
                Custo
              </label>
              <NumberFormat
                className="form-control"
                id="cost"
                name="cost"
                decimalScale={2}
                decimalSeparator=","
                prefix="R$ "
                fixedDecimalScale={true}
                value={values.price}
                allowNegative={false}
                onValueChange={(v) => setFieldValue("cost", v.floatValue)}
              />
              <div className="form-text text-danger">
                {errors?.cost && <div className="form-text text-danger">{errors.cost}</div>}
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="price" className="form-label">
                Venda
              </label>
              <NumberFormat
                className="form-control"
                id="price"
                name="price"
                decimalScale={2}
                decimalSeparator=","
                prefix="R$ "
                fixedDecimalScale={true}
                value={values.price}
                allowNegative={false}
                onValueChange={(v) => setFieldValue("price", v.floatValue)}
              />
              {values.price}
              <div className="form-text text-danger">
                {errors?.price && <div className="form-text text-danger">{errors.price}</div>}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col"></div>
            <div className="col-auto">
              <button type="reset" className="btn btn-outline-dark">
                Limpar
              </button>
              &nbsp;
              <button type="submit" className="btn btn-outline-dark">
                Salvar
              </button>
            </div>
          </div>
        </form>
        <Products products={products} />
        <ModalTypes types={p_types} errors={errors} />
        <ModalCategories categories={p_categories} errors={errors} />
      </React.Fragment>
    </Layout>
  );
};
