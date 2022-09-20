import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigator/AppNavigator';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const App = () => {

  return (
      <AuthProvider>
        <Router>
          <AppNavigator />
        </Router>
      </AuthProvider>
  );
}

export default App;