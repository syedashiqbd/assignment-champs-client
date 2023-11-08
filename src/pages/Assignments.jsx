import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading1 from '../components/Loading1';
import AssignmentCard from '../components/AssignmentCard';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Assignments = () => {
  const [difficulty, setDifficulty] = useState('');
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(0);
  const { total } = useLoaderData();

  const axiosInstance = useAxiosSecure();
  const {
    data: assignments,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['assignments', difficulty, page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/assignments?difficulty=${difficulty}&page=${page}&limit=${limit}`
      );
      const data = await response.data;
      return data;
    },
    retry: 3,
  });

  const totalCount = Math.ceil(total / limit);
  console.log(totalCount);
  const totalButton = [...Array(totalCount).keys()];

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalButton.length - 1) {
      setPage(page + 1);
    }
  };
  console.log(page);
  if (isError)
    return <h1 className="text-center text-primary">Error Loading Data !!!</h1>;

  return (
    <div>
      <div className="lg:w-[1280px] md:w-[780px] w-[400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mt-20  mb-10 border-purple-700 border-2 py-7 px-4 rounded-lg">
          <h1 className="lg:text-4xl text-xl text-primary font-semibold pl-5 lg:border-l-8 lg:border-b-0  border-b-8 border-purple-600 pb-4 lg:pb-0 ">
            All Assignment at a Glance
          </h1>
          <div>
            <select
              className="select select-secondary bg-primary text-white  w-full max-w-xs border-none"
              name="difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Filter Difficulty Wise</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <Loading1></Loading1>
        ) : (
          <div className="grid lg:gap-8 md:gap-4 gap-3">
            {assignments?.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                refetch={refetch}
              ></AssignmentCard>
            ))}
          </div>
        )}
        <div className="join my-6 flex justify-center">
          <button
            onClick={handlePrevious}
            className="join-item bg-primary btn text-white"
          >
            Prev
          </button>
          {totalButton?.map((item, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(item)}
                className={
                  item === page
                    ? 'join-item bg-green-700 btn text-white'
                    : 'join-item  bg-primary btn text-white'
                }
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={handleNext}
            className="join-item bg-primary btn text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Assignments;
