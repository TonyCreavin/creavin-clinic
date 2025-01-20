import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes('/sign');

  return (
    <div>
      {!isAuthRoute && (
        <div className="py-5 px-10 flex justify-between items-center bg-primary">
          <Link href="/" className="text-white text-2xl font-semibold">
            Creavin Clinic
          </Link>
          <Link href="/sign-in" className="text-white text-md underline">
            Sign In
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}

export default PublicLayout;
