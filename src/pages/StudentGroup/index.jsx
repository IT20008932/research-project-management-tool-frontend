import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { getGroupsStore } from "../../store/StudentGroup";
import groupRequest from "../../api/StudentGroup/student-group.request";

export const StudentGroup = () => {
  const initialInput = {
    groupID: "",
    groupName: "",
    topic:""
  };

  const groups = useSelector((state) => state.StudentGroup);
  const [group, setStudentGroup] = useState([]);
  const [inputs, setInputs] = useState(initialInput);
  const dispatch = useDispatch();

  const StudentGroup = () => {

    groupRequest
      .addStudentGroup({
        groupID: inputs.id,
        groupName: inputs.name,
        topic: inputs.topic
      })
      .then((res) => {
        console.log(res);
        if (res.data === "Group saved successfully") {
          setInputs(initialInput);
          toast.success("Group creation success!");
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  useEffect(() => {
    dispatch(getGroupsStore()).then((response) => {
      console.log(response);
    });
  }, [dispatch]);

  useEffect(() => {
    groupRequest.getStudentGroups().then((res) => {
      console.log(res);
      console.log(res.data.data[0].description);
      setStudentGroup(res.data.data);
    });
  }, [group]);

  const DeleteGroup = (id) => {
    groupRequest.DeleteGroup(id).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-64 pt-10">
          <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Create Your Group Here
          </h1>
          <label className="label">
            <span className="label-text">Group Name</span>
          </label>
          <input
            className="mt-1 input input-bordered w-full"
            type="text"
            name="gname"
            placeholder="Enter group name..."
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <label className="label">
            <span className="label-text">Topic</span>
          </label>
          <input
            className="mt-1 input input-bordered w-full"
            type="text"
            name="topic"
            placeholder="Enter project topic..."
            value={inputs.topic}
            onChange={handleChange}
            required
          />
          <button
            className="mt-4 btn btn-active btn-primary w-full"
            onClick={StudentGroup}>
            SAVE
          </button>
          <br />
          <br />
          <br />
          <br />

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Group Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Project Topic
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <td class="px-6 py-1">
                      {group.map((g) => (
                        <div key={g.groupID}>
                          {g.groupName}
                          <br />
                          <br />
                        </div>
                      ))}
                    </td>
                  </th>
                  <td class="px-6 py-1">
                      {group.map((g) => (
                        <div key={g.groupID}>
                          {g.topic}
                          <br />
                          <br />
                        </div>
                      ))}
                    </td>
                  <td class="px-6 py-1">
                    {group.map((g) => (
                      <div key={g.groupID}>
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <button onClick={() => DeleteGroup(g._id)}>
                            Delete
                          </button>
                        </a>
                        <br />
                        <br />
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
