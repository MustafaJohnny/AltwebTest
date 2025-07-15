import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
    isOpen:boolean
    onClose: () => void
    onDeleteUser: () => void
}

export default function DeleteUserPopup(props:Props) {
    return (
        <Modal
            popup
            size="md"
            show={props.isOpen}
            onClose={props.onClose}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="h-14  w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
                </h3>
                <div className=" flex justify-center gap-4">
                <Button onClick={props.onDeleteUser} color="failure">
                    Yes, i am sure
                </Button>
                <Button color="gray" onClick={props.onClose}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    )
}