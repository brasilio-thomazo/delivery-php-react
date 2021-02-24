import React from "react";

export default ({ formik: { handleSubmit }, title, id, children }) => {
  return (
    <div className="modal fade" id={id}>
      <form onSubmit={handleSubmit}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
              {children.map((child) => {
                return child;
              })}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
                Fechar
              </button>
              <button type="submit" className="btn btn-outline-dark">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
