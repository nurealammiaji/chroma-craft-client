import { Helmet } from "react-helmet-async";
import shape from "../../../../assets/6.png"
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PublishableKey}`);

const Payment = () => {

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Payment || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 mx-auto md:max-w-screen-sm">
                <div className="mt-5">
                    <SectionHeader title={"Payment"} background={shape}></SectionHeader>
                </div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;