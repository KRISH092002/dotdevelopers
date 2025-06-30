import Button from "../../common/components/button";
import Input from "../../common/components/inputs";
import useCustomForm from "../../common/components/useCustomForm";
import { axiosInstance, getRouteUrl } from '../../common/components/axiosService';

export default function AddCustomerForm({user}){
    const addCustomer = useCustomForm({
            name: '',
            email: '',
            phone: '',
            address: '',
            user_id: user.id
        });
        const addNewCustomer = (e) => {
        let required_fields = ['name','email','phone'],
            newErrors = addCustomer.errors,
            hasError = addCustomer.hasErrors;
        addCustomer.setLoading(true)
        e.preventDefault();
        required_fields.forEach((key) => {
            for (key in addCustomer.data) {
                if (Object.prototype.hasOwnProperty.call(addCustomer.data, key)) {
                    const element = addCustomer.data[key];
                    if (element.length == 0) {
                        newErrors[key] = true;
                        hasError = true;

                    }

                }
            }

        })
        addCustomer.setErrors(newErrors);
        addCustomer.setHasError(hasError);
        if (!hasError) {
            axiosInstance.post(getRouteUrl('billingapp.add.new.client'), addCustomer.data)
                .then((response) => {
                    addCustomer.setLoading(false);
                    addCustomer.reset();
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });

        } else {
            addCustomer.setLoading(false);
        }

    };
    return(
        <div className='p-4'>
            <form onSubmit={addNewCustomer}>
                <Input type='text' label='Client Name' placeholder='Customer  name' id='customer_name' name='name' value={addCustomer.data.name} event='onChange' handler={(e) => addCustomer.handleChange('name', e.target.value)} Validate={true} onError={!addCustomer.errors.name} errorMsg='The field is required' />
                <Input type='email' label='Client Email' placeholder='email' id='customer_email' name='email' value={addCustomer.data.email} event='onChange' handler={(e) => addCustomer.handleChange('email', e.target.value)} Validate={true} onError={!addCustomer.errors.email} errorMsg='The field is required' />
                <Input type='tel' label='Client Phone' pattern='^\d{10}$' placeholder='3232323' id='customer_phone' name='phone' value={addCustomer.data.phone} event='onChange' handler={(e) => addCustomer.handleChange('phone', e.target.value)} Validate={true} onError={!addCustomer.errors.phone} errorMsg='The field is required' />
                <Input type='textarea'label='Client Address' rows='4' cols='50' id='customer_address' name='address' placeholder='fdsfdsf' value={addCustomer.data.address} event='onChange' handler={(e) => addCustomer.handleChange('address', e.target.value)} Validate={true} onError={!addCustomer.errors.stock} errorMsg='The field is required' />
                <Button isLoading={addCustomer.loading} type='design1' submit={true} label='Add Customer'  disabled={addCustomer.hasErrors}/>
            </form>
        </div>
    )
}