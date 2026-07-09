import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import VendorSignup from "./components/VendorSignup"
import Dashboard from "./components/Dashboard"
import SideNavbar from "./components/SideNavbar"
import Header from "./components/Header"
import AddProduct from "./components/AddProduct";
import InhouseProduct from './components/InhouseProduct';
import InhouseOrder from './components/InhouseOrder';
import SellerOrders from './components/SellerOrders';
import WhatsApp from './components/WhatsApp';
import Comission1 from './components/Comission1';
import CustomerViewProducts from './components/CustomerViewProducts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TermsCondition from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import CancelPolicy from './pages/CancelPolicy';
import Refer from './pages/Refer';
import CustomerRegister from './components/CustomerRegister';
import CustomerLogin from './components/CustomerLogin';
import Detailes from './pages/Detailes';
import AddToCart from './pages/AddToCart';
import HeroSection from './components/HeroSection';
import ScrollToTop from './common/ScrollToTop';
import VendorLogin from './components/VendorLogin';



function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Public Routes (No Sidebar/Header) */}
        <Route path="/" 
        element={<>
        <Navbar />
        <HeroSection/>
        <CustomerViewProducts/>
      <Footer/> </>
      } 
        
        />

        <Route path='/term'
         element={<>
         <Navbar/>
         <TermsCondition/>
         <Footer/>
         </>
        }
         />
         <Route path='/privacy'
          element={<>
          <Navbar/>
          <PrivacyPolicy/>
          <Footer/>
          </>

          }/>
          <Route path='/refund' 
          element={<>
          <Navbar/>
          <RefundPolicy/>
          <Footer/>
          </>
          }/>

           <Route path='/cancel' 
           element={<>
           <Navbar/>
           <CancelPolicy/>
           <Footer/>
           </>
           }/>

            <Route path='/detail' 
           element={<>
           <Navbar/>
           <Detailes/>
           <Footer/>
           </>
           }/>

   <Route path='/addtocart' 
           element={<>
           <Navbar/>
           <AddToCart/>
           <Footer/>
           </>
           }/>

<Route path="/addtocart" element={<AddToCart />} />

        <Route path="/vendor-admin-signup" element={<VendorSignup />} />

<Route path='/vendor-admin-login' element={<VendorLogin/>}/>
        {/* Protected Routes - Dashboard Layout */}
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                  <Dashboard />
                </main>
              </div>
            </div>
          }
        />

        {/* Products Routes */}
        <Route
          path="/add-product"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <AddProduct />
                </main>
              </div>
            </div>
          }
        />

         <Route
          path="/inhouse-product"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <InhouseProduct />
                </main>
              </div>
            </div>
          }
        />

        <Route
          path="/inhouse-order"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <InhouseOrder />
                </main>
              </div>
            </div>
          }
        />

        
        <Route
          path="/seller-order"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <SellerOrders />
                </main>
              </div>
            </div>
          }
        />


    <Route
          path="/whatsapp"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <WhatsApp />
                </main>
              </div>
            </div>
          }
        />

          <Route
          path="/comission"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <Comission1 />
                </main>
              </div>
            </div>
          }
        />
     <Route
  path="/refer"
  element={
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideNavbar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <Refer />
        </main>
      </div>
    </div>
  }
/>

          <Route path='/customer-register' element={
          <>
           <Navbar/>
          <CustomerRegister/>
          <Footer/>
          </>
         }/>

 <Route path='/customer-login' element={
          <>
           <Navbar/>
          <CustomerLogin/>
          <Footer/>
          </>
         }/>




        {/* Add more routes here */}
         {/* <Route
          path="/products"
          element={
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <SideNavbar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                  <InhouseProducts />
                </main>
              </div>
            </div>
          }
        /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App