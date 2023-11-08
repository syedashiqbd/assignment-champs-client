import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';
import useAuth from '../hook/useAuth';
import useAxiosSecure from '../hook/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateAssignment = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const [dueDate, setDueDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    return currentDate;
  });

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const assignment_title = form.assignment_title.value;
    const description = form.description.value;
    const marks = Number(form.marks.value);
    const difficulty = form.difficulty.value;
    const thumbnail = form.thumbnail.value;
    const addAssignment = {
      assignment_title,
      description,
      marks,
      difficulty,
      dueDate,
      thumbnail,
      submitBy: user.email,
    };
    // console.log(addAssignment);

    axiosInstance
      .post('/assignment', addAssignment)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success('Assignment added successfully');
          navigate('/assignments');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="lg:w-[1200px] md:w-[780px] w-[400px] mx-auto">
        <div className=" lg:py-8 lg:px-28 py-6 px-10 text-center w-10/12 mx-auto">
          <h1 className="divider lg:mb-20 mb-10 text-primary lg:text-4xl text-xl font-semibold">
            Add Assignment
          </h1>
          <form onSubmit={handleAddAssignment}>
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
                  className="select select-bordered"
                  required
                >
                  <option disabled selected value="">
                    Select difficulty
                  </option>
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
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  minDate={dueDate}
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
                  placeholder="Enter thumbnail URL"
                  className="input input-bordered"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Add Assignment"
              className="btn w-full bg-primary text-white border-none mt-8 hover:bg-transparent hover:text-primary hover:border hover:outline hover:outline-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateAssignment;
