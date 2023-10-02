import React, { createContext } from 'react';
import { Router, Route, Routes } from 'react-router';

import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import Overview from './components/Overview';


const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);


function App() {
  return (
    <ReachableContext.Provider value="Light">

      <div className="h-screen">
        <BrowserRouter >
  
        <Routes>
          <Route path='/' element={<Main>
            <Overview/>
          </Main>}>
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
       {/* `contextHolder` should always be placed under the context you want to access */}
       
       

{/* Can not access this context since `contextHolder` is not in it */}
<UnreachableContext.Provider value="Bamboo" />

    </ReachableContext.Provider>
    );
}

export default App;
