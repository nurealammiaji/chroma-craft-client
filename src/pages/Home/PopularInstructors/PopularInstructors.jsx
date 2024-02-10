import shape from "../../../assets/6.png";


const PopularInstructors = () => {
    return (
        <div>
            <div>
                <div className="text-center" style={{ background: `url(${shape}) center no-repeat` }}>
                    <h3 className="py-5 text-4xl font-semibold text-white">Popular Instructors</h3>
                </div>
                <br /><br />
                {/* <div>
                {
                    (classes) ?
                        <div className="grid gap-5 md:grid-cols-3">
                            {
                                (classes) &&
                                classes.slice(0, 6).map(item => <ClassItem key={item._id} item={item}></ClassItem>)
                            }
                        </div> : <>
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
            </div> */}
            </div>
        </div>
    );
};

export default PopularInstructors;