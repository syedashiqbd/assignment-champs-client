import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hook/useAxiosSecure';

const AssignmentDetails = () => {
  const assignment = useLoaderData();
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const name = user.displayName;

  const {
    // _id,
    assignment_title,
    description,
    marks,
    difficulty,
    dueDate,
    thumbnail,
    submitBy,
  } = assignment;

  console.log('submit by:', submitBy);
  console.log('trying to submit:', user.email);

  const formatDateForDisplay = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = `
      ${date.getDate().toString().padStart(2, '0')}
      -${(date.getMonth() + 1).toString().padStart(2, '0')}
      -${date.getFullYear()}`;
    return formattedDate;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAllow = () => {
    if (user?.email === submitBy) {
      toast.error('You are not allowed to submit your own Assignments');
    } else {
      openModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const pdf = form.pdf.value;
    const note = form.note.value;
    const submitAssignment = {
      assignment_title,
      description,
      marks,
      difficulty,
      dueDate,
      thumbnail,
      submitBy,
      pdf,
      note,
      name,
      status: 'pending',
    };
    closeModal();
    axiosInstance
      .post('/submitAssignment', submitAssignment)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success('Assignment Submitted successfully');
          navigate('/submit-assignments');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="lg:w-[1280px] md:w-[780px] w-[400px] mx-auto">
      <h1 className="divider  text-primary text-center mt-14 lg:mb-20 mb-10 lg:text-4xl text-xl font-semibold">
        {assignment_title} <br /> Assignment Details
      </h1>
      <div className="card bg-base-100 shadow-xl relative lg:mt-20 mt-10 ">
        <figure className=" ">
          <img
            src={thumbnail}
            className="lg:h-[550px] h-[350px] w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="font-bold text-4xl">{assignment_title}</h2>
          <p>{description}</p>
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center mt-10">
            <div className="border p-5 rounded border-primary">
              <p className="text-2xl text-purple-600 font-medium">
                Marks: {marks}
              </p>
              <p>Deadline: {formatDateForDisplay(dueDate)}</p>
            </div>
            <div className="lg:mt-5 mb-10">
              <p className="text-3xl bg-purple-600 text-white py-1 px-2 rounded max-w-max uppercase">
                {difficulty}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6  w-full text-center">
          <button
            className="btn btn-neutral bg-primary text-white border-none lg:w-1/3"
            onClick={handleAllow}
          >
            Take Assignment
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-middle md:w-10/12 w-96 mx-auto "
          open
        >
          <div className="modal-box ">
            <form onSubmit={handleSubmit} method=" modal-action">
              <div className="grid gap-3 grid-cols-1">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">PDF Link </span>
                  </label>
                  <input
                    required
                    type="text"
                    name="pdf"
                    placeholder="Enter Pdf Preview Link"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Quick note</span>
                  </label>
                  <textarea
                    className=" p-4 rounded-lg border"
                    name="note"
                    placeholder="Enter note"
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center text-center gap-6 mt-6">
                <div className="">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success text-white  "
                  />
                </div>
                <div className="modal-action m-0">
                  <button
                    className="btn btn-primary text-white"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignmentDetails;
