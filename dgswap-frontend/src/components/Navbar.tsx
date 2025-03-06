import { FaTimes, FaBars } from "react-icons/fa";
import logo from "./real.jpeg";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useState, useEffect } from "react";




export default function Navbar(){
     const [isOpen,setIsOpen]=useState(false)
     const toggle=()=>{
        setIsOpen(!isOpen)
     }
    const [activeTab, setActiveTab] = useState("home");
    const location = useLocation();
    useEffect(() => {
      if (location.pathname == "/") {
        setActiveTab("home");
      } else if (location.pathname == "/Cryptocurrency") {
        setActiveTab("Cryptocurrency");
      } else if (location.pathname=="/gift-cards") {
        setActiveTab("gift-cards");
      }
    }, [location]);
    return(
        <div>
            <nav>
            <span style={{ 
      fontSize: '1.25rem', 
      fontWeight: 'bold', 
      backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)', 
      WebkitBackgroundClip: 'text', 
      color: 'transparent' 
    }}>
      DragonSwap
    </span>
    <div className="nav">
            <Link to="/" className={`nav-link ${activeTab === "home"? "active" : ""}`} style={{
                textDecoration:"none"
            }}>
        <h4>
        Analytics
        </h4>
            </Link>
            <Link to="/Cryptocurrency" className={`nav-link ${activeTab === "Cryptocurrency"? "active" : ""}`}>
           
        <h4>
        Swap
        </h4>
            </Link>
                <Link to="/Cryptocurrency" className={`nav-link ${activeTab === "Cryptocurrency"? "active" : ""}`}>
           
        <h4>
        Pool
        </h4>
            </Link>
            <Link to="/Cryptocurrency" className={`nav-link ${activeTab === "Cryptocurrency"? "active" : ""}`}>
           
           <h4>
           Subgraph
           </h4>
               </Link>


        
    </div>
    <button className="button">Connect</button>
   
            </nav>
        </div>
    )
}