import { Helmet } from "react-helmet-async";
import useInstructors from '../../../../hooks/useInstructors';
import InstructorRow from "./InstructorRow";
import { DNA } from "react-loader-spinner";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import { Link } from "react-router-dom";

const ManageInstructors = () => {

    const [instructors] = useInstructors();

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Instructors || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Instructors"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (instructors) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Instructor</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (instructors) &&
                                        instructors.map((item, index) => <InstructorRow key={item._id} index={index + 1} item={item}></InstructorRow>)
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
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Instructors: {instructors?.length}</h4>
                    <Link to={"/dashboard/admin/add-instructor"} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add Instructor</Link>
                </div>
            </div>
        </div>
    );
};

{/* <div className="form-control">
<label className="label">
    <span className="label-text">Instructor Name</span>
</label>
<input {...register1("instructor1", { required: true })}
    type="text"
    placeholder="type instructor name"
    name="instructor1"
    className="input input-bordered"
    defaultValue={classInfo?.instructor}
/>
{errors1.instructor1?.type === 'required' && <label className="label">
    <span className="text-error">Instructor Name is required !!</span>
</label>}
</div>
<br />
<div className="form-control">
<label className="label">
    <span className="label-text">Instructor Email</span>
</label>
<input {...register1("instructorEmail1", { required: true })}
    type="email"
    placeholder="type instructor email"
    name="instructorEmail1"
    className="input input-bordered"
    defaultValue={classInfo?.instructor_email}
/>
{errors1.instructorEmail1?.type === 'required' && <label className="label">
    <span className="text-error">Instructor Email is required !!</span>
</label>}
</div>
<br />
<div className="form-control">
<label className="label">
    <span className="label-text">Instructor Image URL</span>
</label>
<input {...register1("instructorImage1", { required: true })}
    type="url"
    placeholder="https://"
    name="instructorImage1"
    className="input input-bordered"
    defaultValue={classInfo?.instructor_image}
/>
{errors1.instructorImage1?.type === 'required' && <label className="label">
    <span className="text-error">Instructor Image URL is required !!</span>
</label>}
</div>
<br /> */}

export default ManageInstructors;