import '@css/App.css'
import '@css/MyStyles.css'
import { CollectionList } from "@/Components/CollectionList.tsx";
import { CollectionPage } from "@/Components/CollectionPage.tsx";
import { HomePage } from "@/Components/HomePage.tsx";
import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import { AuthenticationGuard } from "@/Components/AuthenticationGuard.tsx";
import Profile from "@/Components/Profile.tsx";
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';

export function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <div className={"menu"}>
            <Link to={"/"}>Home</Link>
            <Link to={"/collection"}>My Collection</Link>
          </div>
        </nav>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </div>
      
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"collection"} element={<AuthenticationGuard component={CollectionPage} />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App
