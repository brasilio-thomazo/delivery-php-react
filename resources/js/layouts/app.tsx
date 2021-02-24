import React, { ReactChild } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Properties {
  title: string;
  children: ReactChild;
}

export default (props: Properties) => {
  React.useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <InertiaLink href="/" className="navbar-brand">
              Delivery v1.0.3
            </InertiaLink>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <div className="col-auto me-auto"></div>
              <ul className="navbar-nav col-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <InertiaLink href="/" className="nav-link">
                    Home
                  </InertiaLink>
                </li>
                <li className="nav-item">
                  <InertiaLink href="/users" className="nav-link">
                    Usu&aacute;rios
                  </InertiaLink>
                </li>
                <li className="nav-item">
                  <InertiaLink href="/clients" className="nav-link">
                    Clientes
                  </InertiaLink>
                </li>
                <li className="nav-item">
                  <InertiaLink href="/products" className="nav-link">
                    Produtos
                  </InertiaLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container-fluid">{props.children}</main>
    </React.Fragment>
  );
};
