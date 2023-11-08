import { useState } from 'react';
import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hook/useAxiosSecure';

const SubmitAssignmentCard = ({ submitAssignment, refetch }) => {
  const {
    _id,
    assignment_title,
    marks,
    thumbnail,
    name,
    pdf,
    note,
    submitBy,
    status,
    givenMark,
    markBy,
  } = submitAssignment;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  // const [showPDFViewer, setShowPDFViewer] = useState(false);

  // const pdfFileUrl =
  //   'https://drive.google.com/file/d/17kJLmzndUY4elLZRmKb_f0K1UY3CZyuO/preview';
  // // const pdfFileUrl = pdfFile;

  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPdfModal = () => {
    setIsPdfOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfOpen(false);
  };

  const handleAllow = () => {
    if (user?.email === submitBy) {
      toast.error('You should not mark your own Assignments');
    } else {
      openModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const givenMark = Number(form.givenMark.value);
    const feedback = form.feedback.value;
    const submitMark = {
      givenMark,
      feedback,
      markBy: user.email,
      status: 'completed',
    };
    closeModal();
    axiosInstance
      .patch(`/submitAssignment/${_id}`, submitMark)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Mark given successfully');
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="lg:w-[1280px] w-[400px] mx-auto">
      <div className="max-w-sm h-[550px] card bg-base-100 shadow-xl relative rounded-lg  ">
        <figure className=" ">
          <img src={thumbnail} className="h-[300px] w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="font-bold text-2xl ">{assignment_title}</h2>
          <p>Submitted by: {name}</p>
          <div className="flex justify-between items-center mt-5 ">
            <div className="border  rounded border-primary">
              <p className="text-2xl py-1 px-2 text-purple-600 font-medium">
                Marks: {marks}
              </p>
            </div>
            <div>
              <p
                className={
                  status === 'pending'
                    ? 'text-2xl bg-red-600 text-white py-1 px-2 rounded max-w-max uppercase'
                    : 'text-2xl bg-green-600 text-white py-1 px-2 rounded max-w-max uppercase'
                }
              >
                {status}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              openPdfModal();
            }}
            className="btn btn-primary"
          >
            View Submitted PDF
          </button>
        </div>

        <div className="p-6  w-full text-center">
          {status === 'pending' ? (
            <button
              className="btn btn-success border-none w-full"
              onClick={handleAllow}
            >
              Give Marks
            </button>
          ) : (
            <div>
              <p className="font-bold text-red-600 text-xl">
                You got : {givenMark}
              </p>
              <p>Evaluated by: {markBy}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom max-w-max mx-auto"
          open
        >
          <div className="modal-box ">
            <form onSubmit={handleSubmit} method=" modal-action">
              <div className="grid gap-3 grid-cols-1">
                <div className="form-control  ">
                  <label className="label">
                    <span className="label-text">Submitted PDF Link </span>
                  </label>
                  <input
                    required
                    type="text"
                    name="pdf"
                    defaultValue={pdf}
                    placeholder="Enter GooglePdf Link"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control  ">
                  <label className="label">
                    <span className="label-text">Submitted Quick note</span>
                  </label>
                  <textarea
                    className=" p-4 rounded-lg border"
                    name="note"
                    defaultValue={note}
                    placeholder="Enter note"
                    cols="30"
                  ></textarea>
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Give Marks</span>
                  </label>
                  <input
                    type="number"
                    name="givenMark"
                    defaultValue={marks}
                    placeholder="Give mark"
                    className="input input-bordered"
                  ></input>
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Give Feedback</span>
                  </label>
                  <textarea
                    className=" p-4 rounded-lg border"
                    name="feedback"
                    placeholder="Give feedback"
                    cols="30"
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
      {/* Pdf Modal */}
      {isPdfOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-top max-w-max  mx-auto"
          open
        >
          <div className="modal-box text-center ">
            <iframe
              src={pdf}
              width="740"
              height="1140"
              allow="autoplay"
            ></iframe>

            <button
              className="btn btn-primary text-white mt-7"
              onClick={closePdfModal}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};
export default SubmitAssignmentCard;
