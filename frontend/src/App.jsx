import AuthProvider from "./contexts/AuthContext";
import RoutesList from "./routes/Routes";

const App = () => {
  return (
    <AuthProvider>
      <RoutesList />;
    </AuthProvider>
  );
};

export default App;
