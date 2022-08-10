import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/nav/appHeader";
import { Sidebar } from "./components/nav/sideBar";
import "./App.css";
import { SidebarContext } from "./context/Sidebar";
import { Contacts } from "./pages/contacts";
import OneContact from "./pages/oneContact";
import { FreqContacted } from "./pages/freqContacted";
import OneFreqContacted from "./pages/oneFreqContacted";
import { store } from "./store/app";
import { Provider } from "react-redux";
import Other from "./pages/other";
import OneOther from "./pages/oneOther";
import { Trash } from "./pages/trash";
import OneTrash from "./pages/oneTrash";
import Createcontact from "./pages/createContact";
import OneLabel from "./pages/oneLabel";
import ManageLabels from "./components/manageLabels";
import SimpleSnackbar from "./components/feedback/MobileSnackbar";
import LogInPage from "./pages/logIn";
import Merge from "./pages/merge";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { setAuth } from "./store/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "./store/slices/contacts.slice";
import { getLabels } from "./store/slices/label.slice";
import { authService } from "./services/auth.service";
import { setLoggedIn } from "./store/slices/auth.slice";

function Wrapper({ children }) {
  let dispatch = useDispatch();
  let logged_in = useSelector((state) => state.authentication.logged_in);
  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let auth = Cookies.get("auth");
    if (auth) {
      auth = JSON.parse(auth);
      dispatch(setAuth(auth));
      dispatch(getContacts(auth.uid));
      dispatch(getLabels(auth.uid));
    }
    authService.listenForAuthChange({
      login(param) {
        if (!logged_in) {
          dispatch(setAuth(param));
          dispatch(setLoggedIn(true));
          dispatch(getContacts(param.uid));
          dispatch(getLabels(param.uid));
          if (location.pathname == "/LoginPage") {
            navigate("/");
          }
        }
      },
      logout: () => {
        dispatch(setLoggedIn(false));
        navigate("/LogInPage");
      },
    });
    setLoaded(true);
  }, [logged_in]);
  return loaded && children;
}
function App() {
  const [isSidebarOpen, toggleSidebar] = useState(false);

  return (
    <Provider store={store}>
      <Wrapper>
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
          <AppHeader />
          <SimpleSnackbar />
          {/* <ExportModal/> */}
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
            <Sidebar open={isSidebarOpen} />
            <main
              className={`col-span-1 ${
                isSidebarOpen ? "md:col-span-4" : "md:col-span-5"
              } bg-white`}
            >
              <Routes>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Contacts />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contacts">
                  <Route
                    path=":contact_id"
                    element={
                      <ProtectedRoute>
                        <OneContact />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/FreqContacted">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <FreqContacted />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":freq_id"
                    element={
                      <ProtectedRoute>
                        <OneFreqContacted />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/Other">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Other />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":other_id"
                    element={
                      <ProtectedRoute>
                        <OneOther />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/trash">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Trash />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":contact_id"
                    element={
                      <ProtectedRoute>
                        <OneTrash />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/createcontact">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Createcontact />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route path=":bookId" element={<OneTrash />} /> */}
                </Route>
                <Route path="/labels/:label_id">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <OneLabel />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/logInPage">
                  <Route index element={<LogInPage />} />
                  {/* <Route path=":bookId" element={<OneTrash />} /> */}
                </Route>
                <Route path="/Merge">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Merge />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route path=":bookId" element={<OneTrash />} /> */}
                </Route>
                {/* <Route path="/import">
              <Route index elemeimport SimpleSnackbar from './components/alerts/MobileSnackbar';
nt={<Importt />} />import { getContacts } from './store/slices/contacts.slice';
import { getLabels } from './store/slices/label.slice';

              <Route path=":bookId" element={<OneFreqContacted />} />
            </Route> */}

                {/* <Route path="/contacts" element={<Contacts />} /> */}
                {/* <Route path="/books">
          <Route index element={<Books />} />
          <Route path=":bookId" element={<OneBook />} />
        </Route>

        <Route path="/products">
          <Route index element={<Products />} />
          <Route path=":productId" element={<OneProduct />} />
        </Route> */}
                {/* <Route path="/" element={<Dashboard />}>
    <Route path="messages" element={<DashboardMessages />} />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} /> */}
              </Routes>
            </main>
          </div>
        </SidebarContext.Provider>
      </Wrapper>
    </Provider>
  );
}

export default App;
