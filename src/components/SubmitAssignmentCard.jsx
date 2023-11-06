import { useState } from 'react';

const SubmitAssignmentCard = ({ submitAssignment }) => {
  const { _id, assignment_title, marks, thumbnail, name, pdf, note } =
    submitAssignment;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lg:w-[1280px] w-[400px] mx-auto">
      <div className="max-w-sm h-[550px] card bg-base-100 shadow-xl relative rounded-lg  ">
        <figure className=" ">
          <img src={thumbnail} className="h-[300px] object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="font-bold text-3xl ">
            {assignment_title.length > 15
              ? assignment_title.slice(0, 15)
              : assignment_title}
            ...
          </h2>
          <p>Submitted by: {name}</p>
          <div className="flex justify-between items-center mt-5 ">
            <div className="border  rounded border-primary">
              <p className="text-2xl py-1 px-2 text-purple-600 font-medium">
                Marks: {marks}
              </p>
            </div>
            <div>
              <p className="text-2xl bg-red-600 text-white py-1 px-2 rounded max-w-max uppercase">
                Pending
              </p>
            </div>
          </div>
        </div>
        <div className="p-6  w-full text-center">
          <button
            className="btn btn-success border-none w-full"
            onClick={openModal}
          >
            Give Marks
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box ">
            <form method=" modal-action">
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
                    placeholder="Enter Pdf Link"
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
    </div>
  );
};
export default SubmitAssignmentCard;
