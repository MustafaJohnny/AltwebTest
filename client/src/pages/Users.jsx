import toast from "react-hot-toast";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteUserPopup from "../components/DeleteUserPopup";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://altwebtest.onrender.com/api/user/getusers`,{
          credentials:"include"
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error("Error fetching users");
          return;
        }
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUsers();
  }, [currentUser._id]);
  
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`https://altwebtest.onrender.com/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('user has been deleted')

        setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
        
      toast.error(error);
    }
  };

  return (
      <div className="mt-20 pl-6 pr-6 w-full overflow-x-auto scrollbar scrollbar-track-orange-500 scrollbar-thumb-orange-800dark:scrollbar-track-blue-700 dark:scrollbar-thumb-blue-500">
        <Table hoverable className="shadow-sm">
          <Table.Head>
            <Table.HeadCell>created at</Table.HeadCell>
            <Table.HeadCell>user name</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>delete</Table.HeadCell>
          </Table.Head>
          {users.map((user) => (
            <Table.Body
              key={currentUser._id + Math.floor(Math.random() * 111111)}
              className="divide-y shadow-sm "
            >
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="  font-medium text-gray-900 dark:text-white">
                  {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      if(currentUser._id === user._id) return;
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                    className={`font-medium text-${currentUser._id === user._id ? 'gray' : 'red'}-500 hover:underline cursor-pointer"`}
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        <DeleteUserPopup
          isOpen={showModal}
          onDeleteUser={handleDeleteUser}
          onClose={() => setShowModal(false)}
        />
      </div>
  );
}