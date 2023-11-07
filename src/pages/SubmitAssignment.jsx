import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import Loading1 from '../components/Loading1';
import SubmitAssignmentCard from '../components/SubmitAssignmentCard';

const SubmitAssignment = () => {
  const axiosInstance = useAxiosSecure();

  const {
    data: submitAssignments,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['submitAssignments'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/submitAssignment?status=pending'
      );
      const data = await response.data;
      return data;
    },
    retry: 3,
  });
  // console.log(submitAssignments);

  if (isLoading) return <Loading1></Loading1>;
  if (isError) return <h1>Error Loading Data !!!</h1>;

  return (
    <div className="lg:w-[1280px] w-[400px] mx-auto">
      <div className="flex justify-between items-center mt-20  mb-10 border-purple-700 border-2 py-7 px-4 rounded-lg">
        <h1 className="text-4xl text-primary font-semibold pl-5 border-l-8 border-green-600 ">
          Submitted Assignment
        </h1>
      </div>
      {isLoading ? (
        <Loading1></Loading1>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          {submitAssignments?.map((submitAssignment) => (
            <SubmitAssignmentCard
              key={submitAssignment._id}
              submitAssignment={submitAssignment}
              refetch={refetch}
            ></SubmitAssignmentCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default SubmitAssignment;
