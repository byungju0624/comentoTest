import "./App.scss";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import WritingList from "./components/writingList/writingList.jsx";

import Detail from "./components/detail/detail.jsx";
import { Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app">
        <Route path="/" component={WritingList} exact={true} />
        <Route path={["/:id"]} component={Detail} />
      </div>
    </>
  );
}

export default App;
