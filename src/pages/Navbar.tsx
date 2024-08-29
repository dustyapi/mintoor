import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import LogoImage from "../../public/fire.png";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Navbar: React.FC<any> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-inner-container">
        <div className="navbar-logo">
          <Image
            src={LogoImage}
            alt={"logo"}
            height={40}
            width={40}
            style={{
              filter: "invert(100%) sepia(100%) saturate(5) hue-rotate(250deg)",
            }}
          />
          <h2>Mintr</h2>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          style={{ fontSize: "2rem" }}
        >
          ☰
        </button>
      </div>

      <div
        className={`navbar-container-top ${
          isMobileMenuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <Link href={"./"} className="navbar-item">
          Home
        </Link>
        <Link href={"./TokenCreator"} className="navbar-item">
          Token Creator
        </Link>
        <WalletMultiButtonDynamic style={{ display: "flex", margin: "auto" }} />
      </div>

      <div
        className={` ${isMobileMenuOpen ? "mobile-menu-open" : "mobile-menu"}`}
      >
        <Link href={"./"} className="navbar-item" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link
          href={"./TokenCreator"}
          className="navbar-item"
          onClick={toggleMobileMenu}
        >
          Token Creator
        </Link>
  
        <WalletMultiButtonDynamic style={{ display: "flex", margin: "auto" }} />
      </div>
    </div>
  );
};

export default Navbar;
