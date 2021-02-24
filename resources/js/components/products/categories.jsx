import React from "react";

import FormModal from "../formModal";
import { Inertia } from "@inertiajs/inertia";
import { useFormik } from "formik";

export const FormCategories = ({ formik: { getFieldProps, resetForm }, errors }) => {
  const id = getFieldProps("id");
  return (
    <React.Fragment>
      <input type="hidden" {...id} />
      <div className="row mb-3">
        <div className="col-sm">
          <label htmlFor="name" className="form-label">
            Nome:
          </label>
          <div className="input-group">
            <input type="text" className="form-control" id="name" {...getFieldProps("name")} />
            {id.value > 0 && (
              <button className="btn btn-outline-dark" type="button" onClick={resetForm}>
                <i className="fas fa-backspace"></i>
              </button>
            )}
          </div>
          {errors.categories?.name && <div className="form-text text-danger">{errors.categories?.name}</div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export function ModalCategories({ categories, errors }) {
  const formik = useFormik({
    initialValues: { name: "", id: -1 },
    onSubmit: handleSubmit,
  });

  function handleSubmit(data) {
    if (data.id < 0) Inertia.post("/product/categories", data, { errorBag: "categories" });
    else Inertia.put(`product/categories/${data.id}`, data, { errorBag: "categories" });
  }

  function handleEdit(data) {
    formik.setValues(data);
  }

  function handleDelete(id) {
    Inertia.delete(`product/categories/${id}`, { errorBag: "categories" });
  }

  return (
    <FormModal formik={formik} title="Categorias de produto" id="modal_categories">
      <FormCategories errors={errors} formik={formik} />
      <Categories categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </FormModal>
  );
}

const Categories = ({ categories, onDelete, onEdit }) => {
  function handleDelete(id) {
    if (typeof onDelete !== "function") return;
    onDelete(id);
  }

  function handleEdit(values) {
    if (typeof onEdit !== "function") return;
    onEdit(values);
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((type, i) => (
            <tr key={i}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleEdit(type)}>
                  <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleDelete(type.id)}>
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

export default Categories;
