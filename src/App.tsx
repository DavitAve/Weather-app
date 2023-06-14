import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/page";
import Layout from "./components/Layout/Layout";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
