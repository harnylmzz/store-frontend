import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryModel } from "../../models/CateegoryModel";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [category, setCategory] = useState<CategoryModel[]>([]);
  useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Çıkış yapıldığında login sayfasına yönlendir
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const fetchCategory = async () => {
    try {
      const result = await CategoryService.getCategories().then(
        (result: any) => result.data.data
      );
      setCategory(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryClick = async (categoryId: number) => {
    try {
      const response = await ProductService.getProductByCategoryId(categoryId);
      const products = response.data.data;
      if (products.length === 0) {
        alert("Bu kategoride ürün bulunmamaktadır.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button onClick={handleLogoClick} className="flex items-center">
                <img
                  src="../../../public/assets/logo/trendymall.png"
                  className="w-40 h-10"
                  alt="Trendymall Logo"
                />
              </button>
            </div>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Çıkış Yap
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Giriş Yap
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Kayıt Ol
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              {category.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category-list/${category.id}`}
                    onClick={() => handleCategoryClick(category.id)}
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <form className="max-w-lg mx-auto">
                <div className="flex">
                  <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    Tüm kategoriler{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Ürünleri arayın..."
                      required
                    />
                    <button
                      type="submit"
                      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
