import React from "react";
import Logo from "../navbar/Logo";
import { links } from "../navbar/links";
import Link from "next/link";
import { LuLinkedin } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
  return (
    <div className="md:grid md:grid-cols-4 flex flex-col gap-4 border-t border-primary/10 items-start p-12">
      <Logo />
      <div className="sapce-y-4">
        <span className="font-semibold text-xl">LINKS</span>
        <ul className="space-y-4">
          {links.map((link) => (
            <Link key={link.route} href={link.route}>
              <li>{link.label}</li>
            </Link>
          ))}
          <Link href="/admin" className="underline">
            <li>Admin</li>
          </Link>
        </ul>
      </div>
      <div className="space-y-4">
        <span className="font-semibold text-xl">LOCATION</span>
        <div>
          <p>FAKE LOCATION</p>
          <p>CALIFORNIA</p>
        </div>
        <div>
          <p>MoidMalikDev@gmail.com</p>
          <p>+923126968917</p>
        </div>
       
      </div>

      <div className="space-y-4">
          <span className="font-semibold text-xl">OUR SOCIAL MEDIAS</span>
          <ul className="flex items-center gap-3 text-3xl">
            <Link href={"https://www.linkedin.com/in/moid-malik-040993344"} target="_blank">
            <LuLinkedin />
            </Link>
            <Link href={"https://www.github.com/moid-malik"} target="_blank">
            <FaGithub />
            </Link>
            <Link href={"mailto:moidmalikdev@gmail.com"} target="_blank">
            <MdMailOutline />
            </Link>
          </ul>
        </div>
    </div>
  );
}
