import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[100px]">
          {/* 로고 + 메뉴 */}
          <div className="flex items-center h-full">
            {/* 로고 */}
            <a href="/" className="flex items-center h-full">
              <img src="/로고.png" alt="Logo" className="h-[90px] w-auto" />
            </a>

            {/* 메뉴 */}
            <nav className="ml-[120px] h-full">
              <ul className="flex items-center h-full space-x-16">
                <li className="h-full flex items-center">
                  <button className="text-gray-900 hover:text-blue-600 transition-colors text-lg h-full flex items-center">
                    문제
                  </button>
                </li>
                <li className="h-full flex items-center">
                  <button className="text-gray-600 hover:text-blue-800 transition-colors text-lg h-full flex items-center">
                    클래스
                  </button>
                </li>
                <li className="h-full flex items-center">
                  <button className="text-gray-900 hover:text-blue-600 transition-colors text-lg h-full flex items-center">
                    랭킹
                  </button>
                </li>
                <li className="h-full flex items-center">
                  <button className="text-gray-600 hover:text-blue-800 transition-colors text-lg h-full flex items-center">
                    실전테스트
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* 우측 영역 */}
          <div className="flex items-center gap-8 h-full">
            <button className="text-yellow-500 hover:text-yellow-600 transition-colors font-medium text-lg h-full flex items-center">
              프리미엄
            </button>
            <button className="text-black hover:text-gray-600 transition-colors text-lg h-full flex items-center">
              로그아웃
            </button>
            <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <FaUserCircle className="w-12 h-12 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;