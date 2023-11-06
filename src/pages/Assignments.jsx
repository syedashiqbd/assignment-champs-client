import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading1 from '../components/Loading1';
import AssignmentCard from '../components/AssignmentCard';

const Assignments = () => {
  const axiosInstance = useAxiosSecure();

  const {
    data: assignments,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const response = await axiosInstance.get('/assignments');
      const data = await response.data;
      return data;
    },
    retry: 3,
  });
  if (isLoading) return <Loading1></Loading1>;
  if (isError) return <h1>Error Loading Data !!!</h1>;

  return (
    <div>
      <div className="lg:w-[1280px] w-[400px] mx-auto">
        <h1 className="text-4xl text-primary font-semibold pl-5 border-l-8 border-purple-600 mt-20  mb-10">
          All Assignment at a Glance
        </h1>
        <div className="grid gap-8">
          {assignments?.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              refetch={refetch}
            ></AssignmentCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Assignments;
