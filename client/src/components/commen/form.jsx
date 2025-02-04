


function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

    function renderInputsByComponentType(getcontrolItem) {
        let element = null;
        const value = formData[getcontrolItem.name] || '';

        switch (getcontrolItem.componentType) {
            case 'input':
                element = (
                    <input
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                        type={getcontrolItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getcontrolItem.name] : event.target.value
                        })}

                        className="w-full placeholder-black  px-3 py-2 bg-yellow-200 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary autocomplete"
                    />
                )
                break;
            case 'select':
                element = (
                    <Select>
                        <SelectTrigger className='w-full'>
                            <selectValue placeholder={getcontrolItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                // getcontrolItem.options && getcontrolItem.options.length

                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case 'textarea':
                element = (
                    <textarea 
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getcontrolItem.name] : event.target.value
                        })}
                    />
                )
                break;

            default:
                element = (
                    <input
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                        type={getcontrolItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getcontrolItem.name] : event.target.value
                        })}

                        className="w-full placeholder-black  px-3 py-2 bg-yellow-200 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                )
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem =>
                        <div className="gride w-full gap-1.5" key={controlItem.name}>
                            <label className="mb-1 font-medium float-left">{controlItem.label}</label><br/>
                            {renderInputsByComponentType(controlItem)}
                        </div>  
                    )
                }
            </div>
            <button type="submit" className="mt-10 w-full">{buttonText || 'Submit'}</button>
        </form>
    )
}

export default CommonForm;