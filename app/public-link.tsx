import type {AnchorHTMLAttributes} from "react";
// Ordinary document navigation is robust under the public Cloudflare prefix
// and does not depend on forwarding React Server Component streams.
export default function PublicLink(props:AnchorHTMLAttributes<HTMLAnchorElement>){return <a {...props}/>;}
