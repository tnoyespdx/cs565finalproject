import '@css/App.css'
import '@css/MyStyles.css'
import { Button, CollectionList } from "@/Components/Button.tsx";
import { HomePage } from "@/Components/HomePage.tsx";
import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import Profile from "@/Components/Profile.tsx";

export function App() {
  
  return (
    <div className="App">
      <HomePage />
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Button />
      <CollectionList />
    </div>
  );
}

export default App
