import type { NextPage } from "next";
interface PropTypes {


}
const Lookup: NextPage<PropTypes> = ({ }: PropTypes) => {

    return ( 
        <div className=" min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Coming Soon
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-200 tracking-tight sm:text-5xl">
                This page is under maintenance
              </h1>
              <p className="mt-1 text-base text-gray-400">
                Try again later
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              
            </div>
          </div>
        </main>
      </div>
    </div>
    )
}


export default Lookup;