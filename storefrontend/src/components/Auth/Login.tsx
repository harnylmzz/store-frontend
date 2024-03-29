import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as Yup from "yup";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";

export default function Login() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const [loggedInUsername, setLoggedInUsername] = useState("");

  interface FormValues {
    username: string;
    password: string;
  }

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("A username is required.")
      .min(3, "Username must be at least 3 characters long.")
      .max(50, "Username must be at most 50 characters long."),
    password: Yup.string()
      .required("A password is required.")
      .min(8, "Password must be at least 8 characters long."),
  });

  const onSubmit = (values: FormValues) => {
    const { username, password } = values;

    axios
      .post("http://localhost:8080/auth/login", {
        username,
        password,
      })
      .then(
        (response) => {
          authContext.setIsAuthenticated(true);
          console.log(response.data.data);
          const token = response.data;
          localStorage.setItem("token", token);
          setLoggedInUsername(username);
          navigate("/");
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  const handleLogout = () => {
    authContext.setIsAuthenticated(false);
    localStorage.removeItem("token");
    setLoggedInUsername("");
    navigate("/login");
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="bg-gray-150 dark:bg-black">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center space-x-13 rtl:space-x-reverse">
                  <img
                    src="../../../public/assets/logo/trendymall.png"
                    className="w-48 h-12"
                    alt="Trendymall Logo"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Hesabınıza giriş yapın
                  </h1>
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Kullanıcı Adı
                      </label>
                      <input
                        type="username"
                        name="username"
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          formik.touched.username && formik.errors.username
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Kullanıcı adınızı girin"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500">
                          {formik.errors.username}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Şifre
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="••••••••"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-black dark:text-gray-600"
                          >
                            Hatırla
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Şifrenizi mi unuttunuz?
                      </a>
                    </div>
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      className="w-full flex justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Giriş Yap
                    </button>
                    <p className="text-sm font-light text-black dark:text-black">
                      Hesabınız yok mu? Ücretsiz hesap oluşturun!{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Kayıt Ol
                      </button>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
