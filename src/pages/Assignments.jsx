import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading1 from '../components/Loading1';
import AssignmentCard from '../components/AssignmentCard';
import { useState } from 'react';

const Assignments = () => {
  const [difficulty, setDifficulty] = useState('');
  const axiosInstance = useAxiosSecure();
  const {
    data: assignments,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['assignments', difficulty],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/assignments?difficulty=${difficulty}`
      );
      const data = await response.data;
      return data;
    },
    retry: 3,
  });

  if (isError) return <h1>Error Loading Data !!!</h1>;

  return (
    <div>
      <div className="lg:w-[1280px] w-[400px] mx-auto">
        <div className="flex justify-between items-center mt-20  mb-10 border-purple-700 border-2 py-7 px-4 rounded-lg">
          <h1 className="text-4xl text-primary font-semibold pl-5 border-l-8 border-purple-600 ">
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
          <div className="grid gap-8">
            {assignments?.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                refetch={refetch}
              ></AssignmentCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Assignments;
