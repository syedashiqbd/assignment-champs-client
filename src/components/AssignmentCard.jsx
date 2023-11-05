const AssignmentCard = ({ assignment }) => {
  const {
    _id,
    assignment_title,
    description,
    marks,
    difficulty,
    formattedDueDate,
    thumbnail,
  } = assignment;

  console.log(assignment);
  return (
    <div className="card card-side bg-base-100 shadow-xl relative ">
      <figure className="w-1/3  ">
        <img src={thumbnail} className="h-[300px] object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-4xl">{assignment_title}</h2>
        <p>{description}</p>
        <div>
          <p className="text-2xl text-purple-600 font-medium">Marks: {marks}</p>
          <p>{formattedDueDate}</p>
        </div>
        <div className="mt-5">
          <p className="text-3xl bg-primary text-white py-1 px-2 rounded max-w-max">
            {difficulty}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-4  p-5">
        <button className="btn btn-primary">Update </button>
        <button className="btn btn-neutral">View </button>
      </div>
      <button className="btn btn-circle bg-primary text-white hover:bg-white hover:text-primary absolute -right-5 -top-6">
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
    </div>
  );
};
export default AssignmentCard;