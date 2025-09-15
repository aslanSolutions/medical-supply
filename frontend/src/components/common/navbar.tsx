import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/vgrBig.png";
import { useTranslation } from "react-i18next";
import ukFlag from "@/assets/flags/uk.png";
import svFlag from "@/assets/flags/sv.png";

export default function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkActive = "bg-[#13a4ec] text-white";
  const linkIdle = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

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
              {t("dashboard")}
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              {t("articles")}
            </NavLink>

            <div className="relative ml-4">
              <button
                className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-100"
                onClick={() => setLangOpen((o) => !o)}
              >
                <img
                  src={i18n.language === "sv" ? svFlag : ukFlag}
                  alt="flag"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-medium">
                  {i18n.language.toUpperCase()}
                </span>
                <i className="fi fi-br-angle-small-down ml-1"></i>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full"
                  >
                    <img src={ukFlag} alt="US" className="w-5 h-5" />
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage("sv")}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full"
                  >
                    <img src={svFlag} alt="SV" className="w-5 h-5" />
                    SV
                  </button>
                </div>
              )}
            </div>
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
                {t("dashboard")}
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  `w-full ${linkBase} ${isActive ? linkActive : linkIdle}`
                }
                onClick={() => setOpen(false)}
              >
                {t("articles")}
              </NavLink>
            </nav>
            <div className="relative ml-4">
              <button
                className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-100"
                onClick={() => setLangOpen((o) => !o)}
              >
                <img
                  src={i18n.language === "sv" ? svFlag : ukFlag}
                  alt="flag"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-medium">
                  {i18n.language.toUpperCase()}
                </span>
                <i className="fi fi-br-angle-small-down ml-1"></i>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full"
                  >
                    <img src={ukFlag} alt="US" className="w-5 h-5" />
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage("sv")}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full"
                  >
                    <img src={svFlag} alt="SV" className="w-5 h-5" />
                    SV
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
