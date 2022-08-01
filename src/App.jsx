import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/nav/AppHeader";
import { Sidebar } from "./components/nav/Sidebar";
import "./App.css";
import { SidebarContext } from "./context/Sidebar";
import { Contacts } from "./pages/Contacts";
import OneContact from "./pages/OneContact";
import { FreqContacted } from "./pages/FreqContacted";
import OneFreqContacted from "./pages/OneFreqContacted";
import { store } from "./store/app";
import { Provider } from "react-redux";
import Other from "./pages/Other";
import OneOther from "./pages/OneOther";
import { Trash } from "./pages/trash";
import OneTrash from "./pages/OneTrash";
import Createcontact from "./pages/createcontact";
import { Labels } from "./pages/labels";
import ManageLabels from "./components/manageLabels";
import SimpleSnackbar from "./components/feedback/MobileSnackbar";
import LogInPage from "./pages/logInPage";
import Merge from "./pages/Merge";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  const [isSidebarOpen, toggleSidebar] = useState(false);

  return (
    <Provider store={store}>
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
              <Route path="/">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Contacts />
                    </ProtectedRoute>
                  }
                />
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
              <Route path="/labels">
                <Route
                  path=":labelId"
                  index
                  element={
                    <ProtectedRoute>
                      <Labels />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path=":bookId" element={<Labels />} />  */}
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
nt={<Importt />} />
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
    </Provider>
  );
}

export default App;
