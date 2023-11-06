import ReactDatePicker from 'react-datepicker';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hook/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateAssignment = () => {
  const assignment = useLoaderData();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();
  const id = assignment._id;

  const [updateDueDate, setUpdateDueDate] = useState(
    new Date(assignment.dueDate)
  );

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2);

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const assignment_title = form.assignment_title.value;
    const description = form.description.value;
    const marks = Number(form.marks.value);
    const difficulty = form.difficulty.value;
    const thumbnail = form.thumbnail.value;
    const updateAssignment = {
      assignment_title,
      description,
      marks,
      difficulty,
      updateDueDate,
      thumbnail,
    };

    axiosInstance
      .put(`/assignments/${id}`, updateAssignment)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Assignment updated successfully');
          navigate('/assignments');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>

      <div className="lg:w-[1280px] w-[400px] mx-auto">
        <div className=" lg:py-8 lg:px-28 py-6 px-10 text-center ">
          <h1 className="divider mb-20 text-primary lg:text-4xl text-xl font-semibold">
            Update Assignment
          </h1>

          <form onSubmit={handleUpdateAssignment}>
            {/* title and description */}
            <div className="lg:grid lg:gap-6 lg:grid-cols-2 grid-cols-1">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  required
                  type="text"
                  name="assignment_title"
                  defaultValue={assignment.assignment_title}
                  placeholder="Enter assignment title"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  required
                  type="text"
                  name="description"
                  defaultValue={assignment.description}
                  placeholder="Enter description"
                  className="input input-bordered"
                />
              </div>
              {/* marks and difficulty */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input
                  required
                  type="number"
                  name="marks"
                  defaultValue={assignment.marks}
                  placeholder="Enter marks"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text">Difficulty</span>
                </label>
                <select
                  name="difficulty"
                  defaultValue={assignment.difficulty}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {/* Due date and thumbnail */}
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text">Due Date</span>
                </label>

                <ReactDatePicker
                  className="input input-bordered w-full text-gray-400"
                  placeholderText="Click to select a date"
                  selected={updateDueDate}
                  onChange={(date) => setUpdateDueDate(date)}
                  minDate={currentDate}
                />
              </div>
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text">Thumbnail URL</span>
                </label>
                <input
                  required
                  type="text"
                  name="thumbnail"
                  defaultValue={assignment.thumbnail}
                  placeholder="Enter thumbnail URL"
                  className="input input-bordered"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Update Assignment"
              className="btn w-full bg-primary text-white border-none mt-8 hover:bg-transparent hover:text-primary hover:border hover:outline hover:outline-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateAssignment;
