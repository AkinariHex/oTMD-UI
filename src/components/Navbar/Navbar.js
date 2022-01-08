
import { signIn, signOut } from "next-auth/client";
import NavLink from '../NavLink/NavLink';
import Link from "next/link";
import { useState } from "react";
import { Home2, Cup, TableDocument, Login, Logout, User, Profile2User, Setting2 } from "iconsax-react";
import { motion } from "framer-motion";

export default function Navbar({ session, userStatus }) {

    let statusColor = {
        "Server": 'rgb(197, 56, 56)',
        "Tourney Manager": 'rgb(48, 164, 226);',
        "Tournaments Host": 'rgb(226, 168, 48);',
        "User": 'transparent'
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const variants = {
        open: { opacity: 1, y: 0, display: 'block' },
        closed: { opacity: 0, y: -10, display: 'none' },
      }

    return (
        <>
            <header>
                <object type="image/svg+xml" data="/img/otmdLOGO.svg" className="logoNavbar" />
                <nav className="navbar">
                            <ul className="navLinks">
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        aria-current="page"
                                        href={"/"}
                                    >
                                    <a className="navLinks_link">Home</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        aria-current="page"
                                        href={"/tournaments"}
                                    >
                                    <a className="navLinks_link">Tournaments</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        aria-current="page"
                                        href={"/documentation"}
                                    >
                                    <a className="navLinks_link">Documentation</a>
                                    </NavLink>
                                </li>
                            </ul>
                </nav>
                <div className="userInfo">
                                {session !== null ? (
                                    <div className="userInfoContent">
                                        <div href="/profile" onClick={() => setIsDropdownOpen(isDropdownOpen => !isDropdownOpen)} >
                                            <a>
                                                <div className="userBackground" style={{background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)) center center / cover no-repeat, url('${session.cover_url}') center center / cover no-repeat`}}>
                                                    <div className="userContent">
                                                        <span className="userInfo_name"><span style={{backgroundColor: statusColor[userStatus.Permissions]}} id="userPermissions"></span>{session.username}</span>
                                                        <img className="userInfo_image" src={session.avatar_url} alt="user image"/>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <motion.div className="profileActions" animate={isDropdownOpen ? "open" : "closed"} variants={variants} transition={{duration: 0.2}}>
                                                <Link href="/profile"><div className="item" onClick={() => setIsDropdownOpen(false)}><User size="16" color="#d9e3f0"/>Profile</div></Link>
                                                {/* <Link href="/settings"><div className="item" onClick={() => setIsDropdownOpen(false)}><Setting2 size="16" color="#d9e3f0"/>Settings</div></Link> */}
                                                <div className="item" onClick={() => {signOut(), setIsDropdownOpen(false)}}><Logout size="16" color="#F47373"/>Logout</div>
                                        </motion.div>
                                    </div>
                                ) : (
                                    <div className="userLogin">
                                        <button style={{display: "flex", alignContent: "center", color: "#fff", backgroundColor: "var(--navbar-link-active-background-color)", fill: "#fff", fontWeight: 400}} onClick={() => signIn("osu")}><img style={{width: "25px", filter: "contrast(0) brightness(2)"}} src="https://img.icons8.com/ios/50/000000/osu.png" alt="osu! logo"/> <span style={{margin: "auto", paddingLeft: "5px", fontFamily: "Poppins"}}>Login</span></button>
                                    </div>
                                )}
                </div>
            </header>
            <div className="mobileNav">
                <div className="nav">
                    <NavLink
                        activeClassName="active"
                        aria-current="page"
                        href={"/"}
                    >
                        <div className="item"><Home2 color="#D9E3F0"/></div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        aria-current="page"
                        href={"/tournaments"}
                    >
                        <div className="item"><Cup color="#d9e3f0"/></div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        aria-current="page"
                        href={"/documentation"}
                    >
                        <div className="item"><TableDocument color="#d9e3f0"/></div>
                    </NavLink>
                    {session !== null ? (
                                    <Link href="/profile" passHref>
                                        <div className="item"><img src={session.avatar_url} alt="user propic"/></div>
                                    </Link>
                                ) : (
                                    <div className="item" onClick={() => signIn("osu")}><Login color="#d9e3f0"/></div>
                                )}
                    
                </div>
            </div>
        </>
    );
  }

