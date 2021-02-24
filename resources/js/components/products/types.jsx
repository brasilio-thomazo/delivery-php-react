import React from "react";

import FormModal from "../formModal";
import { Inertia } from "@inertiajs/inertia";
import { useFormik } from "formik";

export const FormTypes = ({ formik: { getFieldProps, resetForm }, errors }) => {
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
          {errors.types?.name && <div className="form-text text-danger">{errors.types?.name}</div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalTypes = ({ types, errors }) => {
  const formik = useFormik({
    initialValues: { name: "", id: -1 },
    onSubmit: handleSubmit,
  });

  function handleSubmit(data) {
    if (data.id < 0) Inertia.post("/product/types", data, { errorBag: "types" });
    else Inertia.put(`product/types/${data.id}`, data, { errorBag: "types" });
  }

  function handleEdit(data) {
    formik.setValues(data);
  }

  function handleDelete(id) {
    Inertia.delete(`product/types/${id}`, { errorBag: "types" });
  }

  return (
    <FormModal formik={formik} title="Tipos de produto" id="modal_types">
      <FormTypes errors={errors} formik={formik} />
      <Types types={types} onEdit={handleEdit} onDelete={handleDelete} />
    </FormModal>
  );
};

const Types = ({ types, onDelete, onEdit }) => {
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
          {types.map((type, i) => (
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

export default Types;
