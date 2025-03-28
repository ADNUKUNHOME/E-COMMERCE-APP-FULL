import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import addressImg from '../../assets/address.webp';
import Address from '@/components/shopping-view/address';
import ShoppingOrders from '@/components/shopping-view/orders';


function ShoppingAccount() {
    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={addressImg} className='h-full w-full object-cover object-center' />
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    <Tabs defaultValue='orders'>
                        <TabsList>
                            <TabsTrigger className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md"
                                value='orders'>Orders</TabsTrigger>
                            <TabsTrigger className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md"
                                value='address'>Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value='orders'>
                            <ShoppingOrders />
                        </TabsContent>
                        <TabsContent value='address'>
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ShoppingAccount;