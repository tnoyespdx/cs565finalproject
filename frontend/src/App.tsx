import '@css/App.css'
import '@css/MyStyles.css'
import { AddCardCollection } from "@/Components/AddCardCollection.tsx";
import { AddCardWanted } from "@/Components/AddCardWanted.tsx";
import { CollectionPage } from "@/Components/CollectionPage.tsx";
import { HomePage } from "@/Components/HomePage.tsx";
import { WantedPage } from "@/Components/WantedPage.tsx";
import { AuthenticationGuard } from "@/Components/AuthenticationGuard.tsx";
import { Menu } from "@/Components/Menu.tsx";
import { SignupPage } from "@/Components/SignupPage.tsx";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
       <Menu />
      </div>
      
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"collection"} element={<AuthenticationGuard component={CollectionPage} />} />
        <Route path={"collection/add"} element={<AuthenticationGuard component={AddCardCollection} />} />
        <Route path={"wanted"} element={<AuthenticationGuard component={WantedPage} />} />
        <Route path={"wanted/add"} element={<AuthenticationGuard component={AddCardWanted} />} />
        <Route path={"signup"} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App
