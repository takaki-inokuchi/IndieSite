import { UserProvider } from "./provider/UserProvider";
import { Router } from "./Router/Router";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
