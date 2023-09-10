import Link from "next/link";

export default function Error404() {
  return (
    <div className=" min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-200 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-400">
                Please make sure the URL is correct and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-pink-600">
                  Go back home
                </button>
              </Link>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
