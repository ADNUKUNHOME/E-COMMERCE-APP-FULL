import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"


const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress }) => {
    return (
        <Card onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}>
            <CardContent className='grid p-4 gap-6'>
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='flex p-3 justify-between'>
                <Button onClick={() => handleEditAddress(addressInfo)} className='hover:bg-slate-50 hover:text-black'>Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)} className='hover:bg-slate-50 hover:text-black' >Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard
