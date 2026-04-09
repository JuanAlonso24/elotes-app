import { useContext } from "react";
import AuthContext from "./ctx.jsx";
const useAuth = () => useContext(AuthContext);
export default useAuth;
