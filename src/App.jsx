import React, { useState } from "react";
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

function App() {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  return (
    <Provider store={store}>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <AppHeader />
        {/* <LabelModal/>  */}
        {/* <ExportModal/> */}
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
          <Sidebar open={isSidebarOpen} />
          <main
            className={`col-span-1 ${
              isSidebarOpen ? "md:col-span-4" : "md:col-span-5"
            } bg-white`}
          >
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/">
                <Route index element={<Contacts />} />
                <Route path=":bookId" element={<OneContact />} />
              </Route>
              <Route path="/FreqContacted">
                <Route index element={<FreqContacted />} />
                <Route path=":bookIdd" element={<OneFreqContacted />} />
              </Route>
              <Route path="/Other">
                <Route index element={<Other />} />
                <Route path=":bookId" element={<OneOther />} />
              </Route>
              <Route path="/trash">
                <Route index element={<Trash />} />
                <Route path=":bookId" element={<OneTrash />} />
              </Route>
             
              {/* <Route path="/import">
              <Route index element={<Importt />} />
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
