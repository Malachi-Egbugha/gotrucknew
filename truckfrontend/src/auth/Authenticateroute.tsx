import { Route, Redirect } from "react-router-dom";
import {
  isAuthenticated,
  isSuperadmin,
  isAdmin,
  
} from "./index";
type Props = {
    component: any;
    path: string;
    exact: any;
}

export const PrivateRoute = ({ exact,path,component: Component, ...rest }:Props) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const SuperAdminRoute = ({component: Component, ...rest}:Props) =>(
    <Route
    {...rest}
    render={(props) =>
      isSuperadmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />

);
export const AdminRoute = ({component: Component, ...rest}:Props) =>(
    <Route
    {...rest}
    render={(props) =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
)
//superadmin or admin
export const SuperAdminAdminRoute = ({component: Component, ...rest}:Props) =>(
  <Route
    {...rest}
    render={(props) =>
      isAdmin() || isSuperadmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />

)



