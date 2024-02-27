import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./CheckoutForm.css";
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ selected }) => {

    console.log(selected);
    let price = 0;
    if (selected) {
        const total = selected?.reduce((total, item) => total + item.class_price, 0);
        price = parseFloat(total.toFixed(2));
        console.log(total, price);
    }

    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [cardError, setCardError] = useState(null);
    const [cardSuccess, setCardSuccess] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log("Error :", error);
            setCardError(error.message);
        }
        else {
            setCardError(null);
            console.log("Payment Method :", paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
            setCardError(confirmError.message);
        }

        setProcessing(false);

        if (paymentIntent) {
            console.log(paymentIntent);
            if (paymentIntent?.status === "succeeded") {
                setCardSuccess(`${paymentIntent?.status}!! TrxID: ${paymentIntent?.id}`);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Successful !!",
                    text: `TrxID: ${paymentIntent?.id}`,
                    showConfirmButton: true,
                });
                setDisabled(true);
                // navigate("/dashboard/enrolled", { replace: true });
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
                <button className='btn btn-sm btn-outline' type="submit" disabled={!stripe || !clientSecret || processing || disabled}>
                    Pay
                </button>
            </form>
            {
                (cardError) &&
                <p className='font-medium text-center text-error'>{cardError}</p>
            }
            {
                (cardSuccess) &&
                <p className='font-medium text-center text-success'>{cardSuccess}</p>
            }
        </>
    );
};

export default CheckoutForm;