import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import PatientsPage from './homework/pages/PatientsPage';
import OverviewPage from './homework/pages/OverviewPage';
import MapPage from './homework/pages/MapPage';
import DepartmentsPage from './homework/pages/DepartmentsPage';
import DoctorsPage from './homework/pages/DoctorsPage';
import HistoryPage from './homework/pages/HistoryPage';
import SettingsPage from './homework/pages/SettingsPage';
import DefaultLayout from './homework/layout/DefaultLayout';
import NoPage from './homework/pages/NoPage';

// import HomePage from './afternoon/pages/HomePage';
// import BlogPage from './afternoon/pages/BlogPage';
// import CategoryPage from './afternoon/pages/CategoryPage';
// import ProductPage from './afternoon/pages/ProductPage';
// import LoginPage from './afternoon/pages/LoginPage';
// import CustomerPage from './afternoon/pages/CustomerPage';
// import DefaultLayout from './afternoon/layout/DefaultLayout';
// import NoPage from './afternoon/pages/NoPage';

function App() {

  return (
    // Afternoon
    // <>
    // <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<DefaultLayout />}>
    //         <Route index element={<HomePage />} />
    //         <Route path="/blog" element={<BlogPage />} />
    //         <Route path="/category" element={<CategoryPage />} />
    //         <Route path="/product" element={<ProductPage />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/customer" element={<CustomerPage />} />
    //         <Route path="*" element={<NoPage />} />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </>

    // Homework
    <>
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-6 overflow-auto">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<DefaultLayout />} >
              <Route index element={<PatientsPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </>
  )
}

export default App
