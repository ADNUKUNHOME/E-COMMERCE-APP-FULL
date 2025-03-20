import { useEffect, useState } from "react"
import CommonForm from "../commen/form"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { addressFormControls } from "@/config"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddress, deleteAddress, editAddresses, fetchAddresses } from "@/store/shope/address-slice"
import AddressCard from "./address-card"
import { useToast } from "@/hooks/use-toast"

const initialAddressState = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    notes: ''
}

const Address = () => {

    const [formData, setFormData] = useState(initialAddressState);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopeAddress);
    const { toast } = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressState);
            toast({
                title: 'You Can Add Maximum 3 Addresses',
                variant: 'destructive'
            })

            return;
        }

        currentEditedId !== null ? dispatch(editAddresses({
            userId: user?.id, addressId: currentEditedId, formData
        })).then((data) => {
            console.log('Error occured : ',data);
            
            if (data?.payload?.success) {
                dispatch(fetchAddresses(user?.id))
                setCurrentEditedId(null)
                setFormData(initialAddressState)
                toast({
                    title: 'Address Updated Successfully'
                })
            }
        }) :

            dispatch(addNewAddress({
                ...formData,
                userId: user?.id
            })).then((data) => {
                console.log(data);
                if (data?.payload?.success) {
                    dispatch(fetchAddresses(user?.id))
                    setFormData(initialAddressState);
                    toast({
                        title: 'Address Added Successfully'
                    })
                }
            })
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAddresses(user?.id))
                toast({
                    title: 'Address Deleted Successfully',
                    variant : 'destructive'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id);

        setFormData({
            ...formData,
            address: getCurrentAddress.address,
            city: getCurrentAddress.city,
            pincode: getCurrentAddress.pincode,
            phone: getCurrentAddress.phone,
            notes: getCurrentAddress.notes
        })
    }


    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key].trim() !== '').every(item => item)
    }

    useEffect(() => {
        dispatch(fetchAddresses(user?.id))
    }, dispatch)

    console.log('addressList', addressList);



    return <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                addressList && addressList.length > 0 ?
                    addressList.map(singleAddressItem => <AddressCard handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} addressInfo={singleAddressItem} />) : null
            }
        </div>
        <CardHeader>
            <CardTitle>{
                currentEditedId !== null ? 'Edit Address' : 'Add New Address'
            }</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                onSubmit={handleManageAddress}
                isBtnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
}

export default Address
