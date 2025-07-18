import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Button } from './ui/button';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-zinc-100 relative">
        <div className="text-4xl font-bold ml-4 sm:ml-12">
          <Link to="/" onClick={closeMenu}>BlogWala</Link>
        </div>

        {/* Hamburger - visible only on small screens */}
        <div className="sm:hidden mr-4">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col sm:flex sm:flex-row gap-2 sm:gap-1 sm:items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-zinc-100 sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 z-50`}
        >
          {user ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <Link to="/profile" onClick={closeMenu}>
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <FaUser />
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                </Button>
              </Link>

              <Link to="/create" onClick={closeMenu}>
                <Button className="w-full sm:w-auto">Create Post</Button>
              </Link>

              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full sm:w-auto"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link to="/login" onClick={closeMenu}>
                <Button className="w-full sm:w-auto">Login</Button>
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <Button className="w-full sm:w-auto">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <hr className="border-1 border-black" />
    </div>
  );
}

export default Navbar;
