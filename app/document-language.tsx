"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export function DocumentLanguage(){
  const pathname=usePathname();
  useEffect(()=>{document.documentElement.lang=/^\/(?:smarttech\/)?en(?:\/|$)/.test(pathname)?"en":"de";},[pathname]);
  return null;
}
