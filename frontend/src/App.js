import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import axios from 'axios';

function App() {
  const login = async ( userID, userPW ) => {
    await axios.post(process.env.REACT_APP_API_SIGN_IN, {
      user_id: userID,
      user_pw: userPW,
    }, { withCredentials: true })
    .then((response) => {
      if (response.data.results) {
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("userID", JSON.stringify(userID));
        window.localStorage.setItem("username", JSON.stringify(response.data.username));
        window.location.href = "/";
      } else {
        alert("등록된 회원이 아닙니다.");
      }
    });
  };

  const logout = async () => {
    window.localStorage.setItem("isLogin", false);
    window.localStorage.setItem("userID", JSON.stringify(""));
    window.location.href = "/login";
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home logout={logout} />}
      />
      <Route
        path="/login"
        element={<Login login={login} />}
      />
    </Routes>
  );
}

export default App;
