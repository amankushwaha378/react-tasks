import { useState } from "react"
import Modal from "../components/Modal";

function Task1() {
    const [isModalOpen, SetIsModalOpen] = useState();

    return (
        <div className="p-10">
            <button onClick={() => SetIsModalOpen(true)} className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700" >
                Open Modal
            </button>

            <Modal isOpen={isModalOpen} onClose={() => SetIsModalOpen(false)} title="Delete User" size="sm">
                <p>
                    Are you sure you want to delete this user ?
                </p>

                <button onClick={()=> SetIsModalOpen(false)} className="bg-red-500 text-white rounded-md px-3 py-2 mt-5 hover:bg-red-600">
                    Confirm
                </button>
            </Modal>
        </div>
    )
}

export default Task1;