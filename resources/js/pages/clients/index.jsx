import React, { useEffect } from "react";
import Layout from "../../layouts/app";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { useFormik } from "formik";
import { FormClient, Clients } from "../../components/clients";

export default (props) => {
  const { flash } = usePage().props;
  const { errors, clients } = props;
  const formik = useFormik({
    initialValues: {
      id: -1,
      name: "",
      phone: "",
      address: "",
      addr_number: "",
      addr_complement: "",
    },
    onSubmit: (data) => {
      if (data.id > 0) Inertia.put(`clients/${data.id}`, data);
      else Inertia.post("clients", data);
    },
  });

  useEffect(() => {
    Inertia.on("finish", () => {
      if (flash.success) formik.resetForm();
    });
  });

  const handleEdit = (data) => formik.setValues(data);
  const handleDelete = (id) => Inertia.delete(`/clients/${id}`);

  return (
    <Layout title="Clients::Optimus - Deliver v1.0.3">
      <FormClient formik={formik} errors={errors} />
      <Clients onDelete={handleDelete} onEdit={handleEdit} clients={clients} />
    </Layout>
  );
};
