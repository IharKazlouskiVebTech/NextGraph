import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/helpers";
import AuthProvidersComponent from "@/components/auth-providers.component";
import { getCurrentUser } from "@/session/session";
import { SessionInterface } from "@/types";
import { signOut } from "next-auth/react";
import ProfileMenuComponent from "@/components/profile-menu.component";

const NavbarComponent = async () => {
  const session = (await getCurrentUser()) as SessionInterface;

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={60} height={20} alt="Dribble" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenuComponent session={session} />
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProvidersComponent />
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
