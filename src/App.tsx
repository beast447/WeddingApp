import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RSVPForm from "./pages/RSVPForm";
import Management from "./pages/Management";
import AddressForm from "./pages/AddressForm";
import AddressManagement from "./pages/AddressManagement";

function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVPForm />} />
          <Route path="/admin" element={<Management />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/address-management" element={<AddressManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
