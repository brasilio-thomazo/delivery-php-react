import React from "react";
import InputMask from "react-input-mask";
import { places } from "../../services/api";
import { usePage } from "@inertiajs/inertia-react";
//const mbxClient = require("@mapbox/mapbox-sdk");
//const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

export const FormClient = (props) => {
  const { formik } = props;
  const { resetForm, handleSubmit } = formik;
  return (
    <form className="form-clients" onSubmit={handleSubmit} onReset={resetForm}>
      <FieldsClient {...props} />
      <div className="row mb-3">
        <div className="col"></div>
        <div className="col-auto">
          <button className="me-md-3 btn btn-outline-dark" type="reset">
            Limpar
          </button>
          <button className="me-md-3 btn btn-outline-dark" type="submit">
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export const FieldsClient = (props) => {
  const { mbxToken } = usePage().props;
  const { formik, errors } = props;
  const { getFieldProps, values, setFieldValue } = formik;
  const phoneChange = (evt) => setFieldValue(evt.target.id, evt.target.value.replace(/[^\d]/g, ""));

  const [suggestions, setSuggestions] = React.useState([]);
  //const baseClient = mbxClient({ accessToken: mbxToken });
  //const geocoding = mbxGeocoding(baseClient);

  const handleSuggestionChange = ({ target }) => {
    const value = target.value;
    if (value.length === 0) setSuggestions([]);
    else if (value.length % 5 == 0) {
      places
        .search(value, mbxToken)
        .then((response) => {
          setSuggestions(response.data.features);
        })
        .catch(console.error);
      /*
      geocoding
        .forwardGeocode({
          query: value,
          countries: ["br"],
          types: ["address"],
          language: ["pt"],
          proximity: [-46.76467682916416, -23.499345647600578],
        })
        .send()
        .then((response) => {
          arr = response.body.features; // place_name
          console.log(arr);
          setSuggestions(arr);
        })
        .catch((err) => {
          console.log(err);
        });*/
    }
    setFieldValue(target.id, value);
  };

  const handleSelectSuggestion = (data) => {
    setFieldValue("address", data.place_name);
    setSuggestions([]);
  };

  return (
    <React.Fragment>
      <div className="row mb-3">
        <div className="col-sm">
          <label htmlFor="name" className="form-label">
            Nome:
          </label>
          <input type="text" className="form-control" id="name" {...getFieldProps("name")} />
          <div className="form-text text-danger">{errors?.name}</div>
        </div>
        <div className="col-sm">
          <label htmlFor="phone" className="form-label">
            Telefone:
          </label>
          <InputMask
            type="text"
            className="form-control"
            id="phone"
            mask={values.phone.length > 10 ? "(99) 99999-9999" : "(99) 9999-99999"}
            value={values.phone}
            onChange={phoneChange}
            maskChar={null}
          />
          <div className="form-text text-danger">{errors?.phone}</div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm">
          <label htmlFor="address" className="form-label">
            Endere&ccedil;o:
          </label>
          <div className="autocomplete">
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={handleSuggestionChange}
              value={values.address}
            />
            {suggestions.length > 0 && (
              <ul className="autocomplete-box">
                {suggestions.map((suggestion, i) => (
                  <li key={i} onClick={() => handleSelectSuggestion(suggestion)}>
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-text text-danger">{errors?.address}</div>
        </div>
        <div className="col-sm">
          <label htmlFor="addr_number" className="form-label">
            N&uacute;mero:
          </label>
          <input type="number" className="form-control" id="addr_number" {...getFieldProps("addr_number")} />
          <div className="form-text text-danger">{errors?.addr_number}</div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm">
          <label htmlFor="addr_complement" className="form-label">
            Complemento:
          </label>
          <input
            type="text"
            id="addr_complement"
            name="addr_complement"
            className="form-control"
            value={values.addr_complement === null ? "" : values.addr_complement}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const Clients = (props) => {
  const { clients, onEdit, onDelete } = props;

  const handleEdit = (data) => {
    if (typeof onEdit === "function") onEdit(data);
  };

  const handleDelete = (id) => {
    if (typeof onDelete === "function") onDelete(id);
  };

  return (
    <div className="table-responsive table-clients">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endere&ccedil;o</th>
            <th>N&deg;</th>
            <th>Complemento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>{client.addr_number}</td>
              <td>{client.addr_complement}</td>
              <td>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleEdit(client)}>
                  <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => handleDelete(client.id)}>
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

export default Clients;
