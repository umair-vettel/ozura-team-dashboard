import { useState } from "react";

export default function Support() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    alert("Submitted!");
  }

  return (
    <div className="min-h-screen">
      <div className="mt-8 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="email@ozura.io"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              autoComplete="off"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-pink-600"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
