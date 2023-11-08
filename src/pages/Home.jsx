import { Link, NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Banner section */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Unlock Collaborative Learning.
              <span className="sm:block"> Elevate Conversion Rates.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Elevate Your Studies with Group Learning. Join Our Community for
              Better Grades, Stronger Connections, and Improved Study Skills!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </Link>

              <Link
                to="/assignments"
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="lg:w-[1280px] md:w-[780px] w-[400px] mx-auto">
        {/* Feature */}
        <section>
          <div className=" py-8 mx-auto  sm:py-12 ">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Feature Assignment
              </h2>

              <p className="max-w-md mx-auto mt-4 text-gray-500">
                Empower your learning with group study. Collaborate, share
                knowledge, and excel together on our platform. Join us today!
              </p>
            </header>

            <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
              <NavLink to="/assignments">
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Science Technology
                    </h3>

                    <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      See Assignment
                    </span>
                  </div>
                </a>
              </NavLink>

              <NavLink to="/assignments">
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Literature and History
                    </h3>

                    <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      See Assignment
                    </span>
                  </div>
                </a>
              </NavLink>

              <NavLink
                to="/assignments"
                className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
              >
                <p className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Study Cultural Programme
                    </h3>

                    <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      See Assignment
                    </span>
                  </div>
                </p>
              </NavLink>
            </ul>
          </div>
        </section>
        {/* FAQ */}
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center mb-10">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="collapse collapse-plus bg-[#bbf7d0] ">
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div className="collapse-title text-xl font-medium">
            Q1: How do I create or join a study group on your website?
          </div>
          <div className="collapse-content">
            <p>
              A1: To create a study group, sign in, go to the assignment
              section, and click. To join, search for groups or accept
              invitations from friends.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-[#bbf7d0] my-5">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Q3: Can I schedule study sessions and set preferences for study
            groups?
          </div>
          <div className="collapse-content">
            A3: Yes, you can schedule study sessions, set study preferences, and
            manage group activities within the platform to tailor your study
            experience.
          </div>
        </div>
        <div className="collapse collapse-plus bg-[#bbf7d0]">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Q5: How can I report or resolve issues with a group study session?
          </div>
          <div className="collapse-content">
            <p>
              A5: If you encounter any issues, you can report them to our
              support team. We will help resolve any problems to ensure a smooth
              study experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
