import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../components/Login";
import {
  Dashboard,
  NotFound,
  UserInformation,
  DataSection,
  AdminSupport,
  Payment,
  PreviousNotes,
  Settings,
  UserProfile,
  TopNFTs,
} from "../../containers/index";
import PrivateRoute from "./privateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="/user-information" element={<PrivateRoute />}>
          <Route path="/user-information" element={<UserInformation />} />
        </Route>

        <Route path="/data-section" element={<PrivateRoute />}>
          <Route path="/data-section" element={<DataSection />} />
        </Route>

        <Route path="/admin-support" element={<PrivateRoute />}>
          <Route path="/admin-support" element={<AdminSupport />} />
        </Route>

        <Route path="/payment" element={<PrivateRoute />}>
          <Route path="/payment" element={<Payment />} />
        </Route>

        <Route path="/previous-notes" element={<PrivateRoute />}>
          <Route path="/previous-notes" element={<PreviousNotes />} />
        </Route>

        <Route path="/settings" element={<PrivateRoute />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/user-information/user-profile" element={<PrivateRoute />}>
          <Route
            path="/user-information/user-profile/:id"
            element={<UserProfile />}
          />
        </Route>
        <Route path="/top-nfts" element={<PrivateRoute />}>
          <Route path="/top-nfts" element={<TopNFTs />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<Login />} />

        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
