import '@css/App.css'
import '@css/MyStyles.css'
import { AddCard } from "@/Components/AddCard.tsx";
import { CollectionList } from "@/Components/CollectionList.tsx";
import { CollectionPage } from "@/Components/CollectionPage.tsx";
import { HomePage } from "@/Components/HomePage.tsx";
import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import { AuthenticationGuard } from "@/Components/AuthenticationGuard.tsx";
import { Menu } from "@/Components/Menu.tsx";
import Profile from "@/Components/Profile.tsx";
import { SignupPage } from "@/Components/SignupPage.tsx";
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';

export function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
       <Menu />
      </div>
      
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"collection"} element={<AuthenticationGuard component={CollectionPage} />} />
        <Route path={"collection/add"} element={<AuthenticationGuard component={AddCard} />} />
        <Route path={"signup"} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App
