"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, ArrowRight, Zap, Globe, MessageSquare } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 relative overflow-hidden border-t border-zinc-900">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Top Section: Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pb-12 border-b border-zinc-900">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tight leading-tight uppercase mb-4">
              Join the <span className="text-primary italic tracking-tighter">Inner Circle</span>
            </h3>
            <p className="text-zinc-500 font-medium max-w-md">
              Get exclusive access to new component drops, technical guides, and community events directly to your inbox.
            </p>
          </div>
          <div className="flex w-full max-w-md lg:ml-auto">
            <Input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="rounded-none bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-primary focus-visible:border-primary h-14 uppercase tracking-widest text-xs font-bold"
            />
            <Button className="rounded-none h-14 px-8 font-black uppercase tracking-widest text-black">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-black tracking-tighter text-white">NET.</span>
            </Link>
            <p className="text-zinc-500 font-medium leading-relaxed max-w-sm">
              Precision instruments and development hardware designed for those who demand the absolute best in reliability and performance.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="group rounded-none border-zinc-800 bg-zinc-900/50 hover:border-primary hover:bg-primary/10 transition-colors">
                <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
              </Button>
              <Button variant="outline" size="icon" className="group rounded-none border-zinc-800 bg-zinc-900/50 hover:border-primary hover:bg-primary/10 transition-colors">
                <TwitterIcon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
              </Button>
              <Button variant="outline" size="icon" className="group rounded-none border-zinc-800 bg-zinc-900/50 hover:border-primary hover:bg-primary/10 transition-colors">
                <LinkedinIcon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Shop Hardware</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Microcontrollers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Sensors & Input</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Power Systems</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Wireless Modules</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Help Center / FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Returns Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">About NET</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm font-medium">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900 gap-4">
          <p className="text-zinc-600 text-sm font-medium flex items-center gap-2">
            &copy; {new Date().getFullYear()} NET Technologies Inc. <span className="hidden md:inline">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-2 text-zinc-700 text-xs font-bold uppercase tracking-widest">
            <span>Built with precision</span>
            <Zap className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
