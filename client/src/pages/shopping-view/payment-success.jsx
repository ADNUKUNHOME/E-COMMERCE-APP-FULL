import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const PaymentSuccessPage = () => {

  const navigate = useNavigate()

  return (
    <Card className='p-10'>
      <CardHeader className='p-0'>
        <CardTitle className='text-4xl'>Payment Is Successfull!</CardTitle>
      </CardHeader>
      <Button className='mt-5 hover:bg-slate-50' onClick={() => navigate('/shope/account')}>View Order</Button>
    </Card>
  )
}

export default PaymentSuccessPage
