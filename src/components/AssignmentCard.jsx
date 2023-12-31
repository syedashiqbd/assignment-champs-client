import toast from 'react-hot-toast';
import useAuth from '../hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hook/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AssignmentCard = ({ assignment, refetch }) => {
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    _id,
    assignment_title,
    description,
    marks,
    difficulty,
    dueDate,
    thumbnail,
    submitBy,
  } = assignment;

  // console.log(assignment);

  const handleDelete = () => {
    if (user?.email == submitBy) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/assignment/${_id}`).then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            }
          });
        }
      });
    } else {
      toast.error("You can't DELETE others Assignments");
    }
  };
  const handleUpdate = () => {
    if (!user?.email) {
      navigate('/login');
      return;
    }
    if (user?.email === submitBy) {
      navigate(`/update-assignment/${_id}`);
    } else {
      toast.error("You can't UPDATE others Assignments");
    }
  };

  // for date formate
  const formatDateForDisplay = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = `
     ${date.getDate().toString().padStart(2, '0')}
    -${(date.getMonth() + 1).toString().padStart(2, '0')}
    -${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="card lg:card-side bg-base-100 shadow-xl relative border flex
      flex-col "
    >
      <figure className="lg:w-1/3 lg:h-[350px] md:h-[300px]  ">
        <img
          src={thumbnail}
          className="lg:h-[350px] lg:w-full  w-full object-cover "
        />
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-4xl">{assignment_title}</h2>
        <p>
          {description.length > 50 ? description.slice(0, 50) : description}...
        </p>
        <div className="lg:block flex  justify-between mt-2">
          <div>
            <p className="text-2xl text-purple-600 font-medium">
              Marks: {marks}
            </p>
            <p className="bg-green-700 inline text-white p-1 text-sm ">
              {submitBy}
            </p>
            <p>{formatDateForDisplay(dueDate)}</p>
            {/* <p>{submitBy}</p> */}
          </div>
          <div className="mt-5 ">
            <p
              className={
                difficulty === 'easy'
                  ? 'lg:text-3xl text-xl bg-green-600 text-white py-1 px-2 rounded max-w-max uppercase'
                  : difficulty === 'medium'
                  ? 'lg:text-3xl text-xl bg-orange-400 text-white py-1 px-2 rounded max-w-max uppercase'
                  : 'lg:text-3xl text-xl bg-primary text-white py-1 px-2 rounded max-w-max uppercase'
              }
            >
              {difficulty}
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col lg:justify-end justify-center items-end gap-4 p-5">
        {user?.email ? (
          <button onClick={handleUpdate} className="btn btn-primary ">
            Update <br /> Assignment
          </button>
        ) : (
          ''
        )}
        <Link to={`/assignment-details/${_id}`}>
          <button className="btn btn-neutral">
            View <br /> Assignment{' '}
          </button>
        </Link>
      </div>
      {user?.email ? (
        <button
          onClick={handleDelete}
          className="btn btn-circle btn-sm bg-primary text-white hover:bg-white hover:text-primary absolute 
           -top-3 -right-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : (
        ''
      )}
    </motion.div>
  );
};
export default AssignmentCard;
