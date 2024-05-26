import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./CheckoutForm.css";
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { TbCircleArrowRightFilled } from 'react-icons/tb';
import useSelected from '../../../../hooks/useSelected';
import useEnrolled from '../../../../hooks/useEnrolled';
import usePayments from '../../../../hooks/usePayments';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [, refetchEnrolled] = useEnrolled();
    const [, refetchPayments] = usePayments();
    const [selected, refetchSelected] = useSelected();
    const [cardError, setCardError] = useState(null);
    const [cardSuccess, setCardSuccess] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    let price = 0;
    if (selected) {
        const total = selected?.reduce((total, item) => total + item.class_price, 0);
        price = parseFloat(total.toFixed(2));
    }

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price })
            .then(res => {
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
            setPaymentMethod(paymentMethod);
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
                setCardSuccess(`${paymentIntent?.status}! TrxID: ${paymentIntent?.id}`);
                const paidClasses = selected.map(item => (
                    {
                        class_id: item.class_id,
                        class_title: item.class_title,
                        class_image: item.class_image,
                        class_price: item.class_price,
                        category_id: item.category_id,
                        category_name: item.category_name,
                        instructor_id: item.instructor_id,
                        instructor_name: item.instructor_name,
                        instructor_email: item.instructor_email,
                        student_name: user?.displayName,
                        student_email: user?.email,
                        payment_status: paymentIntent?.status,
                        payment_trxID: paymentIntent?.id
                    }));
                const payment = {
                    payment_status: paymentIntent?.status,
                    payment_trxID: paymentIntent?.id,
                    payment_amount: price,
                    payment_currency: paymentIntent?.currency,
                    payment_info: paymentMethod.card,
                    payment_method_id: paymentIntent?.method,
                    payment_method_type: paymentIntent?.payment_method_types[0],
                    client_secret: paymentIntent?.client_secret,
                    student_name: user?.displayName,
                    student_email: user?.email,
                    paid_classes: [...paidClasses]
                };
                fetch('https://chroma-craft-server.vercel.app/payments', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payment)
                })
                    .then(result => {
                        console.log(result);
                        refetchPayments();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                fetch(`https://chroma-craft-server.vercel.app/selected?email=${user?.email}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(result => {
                        console.log(result);
                        refetchSelected();
                        refetchEnrolled();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                fetch('https://chroma-craft-server.vercel.app/enrolled', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(selected)
                    body: JSON.stringify(paidClasses)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Successful !!",
                    text: `TrxID: ${paymentIntent?.id}`,
                    showConfirmButton: true,
                });
                setDisabled(true);
                navigate("/dashboard/enrolled", { replace: true });
            }
        }
    };

    return (
        <>
            <br /><br />
            {
                (selected) &&
                <div className="flex-row items-center justify-around text-center md:flex">
                    <div>
                        <h4 className="p-4 font-medium text-neutral badge badge-outline">Selected Class: {selected?.length}</h4>
                    </div>
                    <div className="my-5 md:my-0">
                        <h4 className="p-4 font-medium text-neutral badge badge-success badge-outline">Total Price: $ {price}</h4>
                    </div>
                </div>
            }
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
                <button className='btn btn-sm btn-outline' type="submit" disabled={!stripe || !clientSecret || processing || disabled || selected?.length === 0}>
                    Pay
                </button>
            </form>
            {
                (cardError) &&
                <p className='font-medium text-center text-error'>{cardError}</p>
            }
            {
                (cardSuccess) &&
                <div className='text-center'>
                    <p className='italic font-medium text-center text-success'>{cardSuccess}</p>
                    <br /><br />
                    <Link to={'/dashboard/enrolled'} className='btn-neutral btn'>Go to Classes<TbCircleArrowRightFilled className="text-xl" /> </Link>
                </div>
            }
        </>
    );
};

export default CheckoutForm;