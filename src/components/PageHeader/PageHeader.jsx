
import { TbArrowBigDownLines, TbArrowsTransferDown } from 'react-icons/tb';

const PageHeader = ({ background, title, subTitle }) => {
    return (
        <div>
            <div className="hero h-[400px] md:h-[650px]" style={{ background: `url(${background}) right no-repeat fixed` }}>
                <div className="hero-overlay bg-warning-content bg-opacity-60"></div>
                <div className="text-center hero-content text-neutral-content">
                    <div>
                        <h1 className="mb-8 font-bold text-7xl">{title}</h1>
                        <br />
                        <p className="text-2xl divider divider-error">{subTitle}</p>
                        <p className='mx-auto mt-40 text-2xl text-center animate-bounce hero-content'><TbArrowBigDownLines /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;