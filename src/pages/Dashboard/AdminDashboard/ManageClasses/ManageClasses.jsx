import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import shape from "../../../../assets/6.png"
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import useClasses from '../../../../hooks/useClasses';
import ClassRow from './ClassRow';

const ManageClasses = () => {

    const [classes] = useClasses();

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Classes"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (classes) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Class</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (classes) &&
                                        classes.map((item, index) => <ClassRow key={item._id} index={index + 1} item={item}></ClassRow>)
                                    }
                                </tbody>
                            </table> :
                            <>
                                <div className="flex items-center justify-center">
                                    <DNA
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="dna-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="dna-wrapper"
                                    />
                                </div>
                            </>
                    }
                </div>
                <br /><br />
                <div className="flex-row items-center justify-between text-center md:flex">
                    <div>
                        <h4 className="p-4 font-medium text-neutral badge badge-outline">Classes: {classes?.length}</h4>
                    </div>
                    <div className="my-5 md:my-0">
                        <button className="p-4 font-medium badge badge-secondary">Add Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;