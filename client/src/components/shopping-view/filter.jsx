import { filterOption } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";



function ProductFilter({filters, handleFilter}) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filter</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOption).map(keyItem => <Fragment>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="gap-2 mt-2">
                                {
                                    filterOption[keyItem].map(option => <Label key={option.id} className='flex items-center gap-3 font-medium'>
                                        <Checkbox checked={
                                            filters && Object.keys(filters).length > 0 && 
                                            filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                        } onCheckedChange={()=>handleFilter(keyItem, option.id)} className="w-5 h-5 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                                        {option.label}
                                    </Label>)
                                }
                            </div>
                        </div>
                        <Separator/>
                    </Fragment>)
                }
            </div>
        </div>
    )
}

export default ProductFilter;