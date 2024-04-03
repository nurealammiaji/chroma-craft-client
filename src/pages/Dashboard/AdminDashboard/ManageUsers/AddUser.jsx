import { Helmet } from "react-helmet-async";

const AddUser = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Users || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        <h3 className="text-lg font-bold">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AddUser;