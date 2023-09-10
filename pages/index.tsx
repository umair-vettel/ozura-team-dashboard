import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useSession, getSession, signIn } from "next-auth/react";
interface PropTypes {

}

const Home: NextPage<PropTypes> = ({}: PropTypes) => {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen flex justify-center gap-12">
      {session ? <div className=" min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
      <div className="max-w-max mx-auto">
        <main className="text-center">
          <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome To OzuraPay
          </p>
          <p className="mt-1 text-base text-gray-400">
                Select a page using the navigation bar.
          </p>
        </main>
      </div>
    </div> : <div className="min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-200 tracking-tight sm:text-5xl">
                Login to Continue
              </h1>
              <p className="mt-1 text-base text-gray-400">
                This page is not available.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a onClick={() => signIn()}>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-pink-600">
                  Login
                </button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>}
    </div>
  );
};



export default Home;
