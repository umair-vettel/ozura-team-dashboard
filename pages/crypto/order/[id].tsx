import { useRouter } from 'next/router'


const OrderIDPage = () => {
    const router = useRouter()

    return (
        <div className='text-white relative left-24'>
            The order ID is : {router.query.id}
        </div>
    )
}

export default OrderIDPage;