import React, { FormEvent, ReactChild } from "react";

interface Properties {
  id: string;
  title: string;
  onSubmit: (e: FormEvent<HTMLElement>) => void;
  children: Array<ReactChild>;
}

export default (props: Properties) => {
  return (
    <div className="modal fade" id={props.id}>
      <form onSubmit={props.onSubmit}>
        <div className="modal-dialog">
          <div className="modal content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className="modal-body">
              {props.children.map((children) => {
                return children;
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dimiss="modal"
              >
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
