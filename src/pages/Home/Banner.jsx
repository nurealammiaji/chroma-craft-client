import { TbCircleArrowRight } from "react-icons/tb";
import image from "../../assets/art-girl.png";
import shape1 from "../../assets/shapes/art-protrait-03.png";

const Banner = () => {
    return (
        <div>
            <div style={{background: `url(${shape1}) top right no-repeat`}} className="grid md:grid-cols-2 gap-20">
                <div className="ps-10 md:mt-40">
                    <h4 className="text-2xl">Chroma Craft</h4>
                    <br />
                    <h2 className="text-5xl font-bold">Develop Your Own<br />Artistic Style</h2>
                    <br />
                    <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, magni fuga? Sunt in ipsa illo quae consequuntur praesentium libero, esse quasi minima nisi, error consectetur voluptates vitae omnis ipsum officiis!</p>
                    <br /><br />
                    <button className="btn btn-neutral text-lg">Get Started Now <TbCircleArrowRight className="text-2xl" /></button>
                </div>
                <div className="mt-20 ml-10">
                    <figure>
                        <img src={image} className="rounded-t-[250px] rounded-br-[250px]" alt="" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default Banner;