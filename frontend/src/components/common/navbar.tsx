import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/vgrBig.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkActive = "bg-[#13a4ec] text-white";
  const linkIdle = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 md:px-6 py-3 shadow">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="MedinStock logo"
              className="md:h-10 h-8 object-contain"
            />
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              Add article
            </NavLink>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? (
              <i className="fi fi-br-cross-small text-xl"></i>
            ) : (
              <i className="fi fi-br-menu-burger text-xl"></i>
            )}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow md:hidden">
            <nav className="flex flex-col p-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `w-full ${linkBase} ${isActive ? linkActive : linkIdle}`
                }
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  `w-full ${linkBase} ${isActive ? linkActive : linkIdle}`
                }
                onClick={() => setOpen(false)}
              >
                Articles
              </NavLink>
              <NavLink
                to="/suppliers"
                className={({ isActive }) =>
                  `w-full ${linkBase} ${isActive ? linkActive : linkIdle}`
                }
                onClick={() => setOpen(false)}
              >
                Suppliers
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `w-full ${linkBase} ${isActive ? linkActive : linkIdle}`
                }
                onClick={() => setOpen(false)}
              >
                Orders
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
