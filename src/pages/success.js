import Header from "../components/Header";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
function success() {
    const router = useRouter();
    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10'/>
                        <h1 className='text-3xl'>Thank You, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping on the amazon 2.0, an awesome clone of amazon. We guarentee to deliver your goods on time see ya!! If you want to see your orders click below.
                    </p>
                    <button onClick={() => router.push('/')} className="button mt-8">
                        Go to Home page
                    </button>
                </div>

            </main>
            
        </div>
    )
}

export default success;
