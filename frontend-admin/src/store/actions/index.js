



export const loadAdminDetailsAction = (args) => async (dispatch) => {
    try {
      console.log("argsargs",args)
      const data = {
        id: args?.id,
        name: args?.name,
        email: args?.email,
        superUser:args?.super_user,
        routeAccess: args?.routes_access,
        viewOnly: args?.view_only
      };
      console.log("data",data)

      dispatch({ type: "LOAD_ADMIN_DATA", payload: data });
    } catch (err) {
      console.log("errr", err);
    }
  };