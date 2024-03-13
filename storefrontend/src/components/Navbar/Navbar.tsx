import { useEffect, useState } from "react";
import { CategoryModel } from "../../models/CateegoryModel";
import CategoryService from "../../services/CategoryService";

export default function Navbar() {
  const [category, setCategory] = useState<CategoryModel[]>([]);

  const fetchCars = async () => {
    try {
      const result = await CategoryService.getCategories().then(
        (result: any) => result.data.data
      );
      setCategory(result);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="../../../public/assets/logo/trendymall.png"
              className="w-40 h-10"
              alt="Trendymall Logo"
            />
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="tel:5541251234"
              className="text-sm text-gray-500 dark:text-white hover:underline"
            >
              (554) 012-3456
            </a>
            <div className="flex items-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Giriş Yap
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Kayıt Ol
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              {category.map((category) => (
                <li key={category.id}>
                  <a
                    href="#"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Aradığınız ürünü bulun..."
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
