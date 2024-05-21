import background from '../../assets/6.png';

const SectionHeader = ({ title }) => {
    return (
        <div>
            <div className="text-center" style={{ background: `url(${background}) center no-repeat` }}>
                <h3 className="py-5 text-4xl font-semibold text-white">{title}</h3>
            </div>
        </div>
    );
};

export default SectionHeader;