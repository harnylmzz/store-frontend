class TokenService {
    getToken() {
      return localStorage.getItem("token");
    }
    setToken() {
      return localStorage.setItem("token", "token");
    }
  }
  
  export default new TokenService();
  