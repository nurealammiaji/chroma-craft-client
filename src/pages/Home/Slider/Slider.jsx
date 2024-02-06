import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import SliderOne from './SlideOne';
import SliderTwo from './SliderTwo';
import SliderThree from './SliderThree';
import SliderFour from './SliderFour';

const Slider = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <SliderOne></SliderOne>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderTwo></SliderTwo>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderThree></SliderThree>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderFour></SliderFour>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;