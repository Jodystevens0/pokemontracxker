'use client';
import { auth } from '../lib/firebase'; // Adjust the path based on your project structure
import NextLink from 'next/link';
import { Link as CustomLink } from '@/ui/link';
import { Searchbar } from './searchbar';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../../public/types/logo.jpg';
import Image from 'next/image';
export default function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const logOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <header className="py-4 md:py-6  shadow-md flex items-center justify-between px-4">
      {/* Logo/Brand Link */}
      <CustomLink
        highlight="none"
        className="font-bungee text-3xl uppercase px-2 md:px-0 focus:outline-none focus:ring focus:ring-primary"
        href="/"
        aria-label="go to home"
      >
        <span className="hidden sm:block">
          <Image src={logo} alt="logo" width={120} height={50} />
        </span>
        <span className="sm:hidden">PF</span>
      </CustomLink>

      {/* Searchbar Component */}
      <Searchbar id="search" />

      {user ? (
        <div className="flex items-center space-x-4">
          <NextLink href="/collections">
            <span className="text-white-500 hover:underline ml-2 md:ml-0">
              Collections
            </span>
          </NextLink>
          <span
            className="text-white-500 hover:underline cursor-pointer"
            onClick={logOut}
          >
            Logout
          </span>
          <h2 className="text-white-500">Welcome: {user?.email}</h2>
        </div>
      ) : (
        <NextLink href="/login">
          <span className="text-blue-500 hover:underline">Login</span>
        </NextLink>
      )}
    </header>
  );
}
