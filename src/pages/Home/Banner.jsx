import { TbCircleArrowRight } from "react-icons/tb";
import image from "../../assets/art-girl.png";
import shape1 from "../../assets/shapes/art-protrait-03.png";
import shape2 from "../../assets/shapes/shape-05.png";
import shape3 from "../../assets/bg-shapes/BG-1.png";
import shape4 from "../../assets/shapes/shape-06.png";
import shape5 from "../../assets/shapes/art-protrait-04.png";

const Banner = () => {
    return (
        <div className="min-h-screen" style={{ background: `url(${shape3}) bottom center no-repeat` }}>
            <div style={{ background: `url(${shape1}) right top no-repeat` }} className="grid md:grid-cols-2 gap-20">
                <div className="ps-10" >
            <div style={{ background: `url(${shape5}) left 90% / 110% 80% no-repeat` }} className="h-32"></div>
                    <h4 className="text-2xl text-primary font-medium">Chroma Craft</h4>
                    <br />
                    <h2 className="text-5xl font-bold">Develop Your Own<br />Artistic Style</h2>
                    <br />
                    <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, magni fuga? Sunt in ipsa illo quae consequuntur praesentium libero, esse quasi minima nisi, error consectetur voluptates vitae omnis ipsum officiis!</p>
                    <br /><br />
                    <button className="btn btn-neutral text-lg mb-5">Get Started Now <TbCircleArrowRight className="text-2xl" /></button>
                </div>
                <div style={{ background: `url(${shape2}) bottom right no-repeat` }} className="md:mt-20 md:ml-24 p-10 md:p-0">
                    <figure style={{ background: `url(${shape4}) no-repeat` }}>
                        <img src={image} className="rounded-t-[250px] rounded-br-[250px] md:w-10/12 mb-5" alt="" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default Banner;