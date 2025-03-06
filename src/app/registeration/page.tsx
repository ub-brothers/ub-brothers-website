"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        officeName: '', country: '', city: '', zipCode: '', address: '', officialEmail: '',
        title: 'Mr', firstName: '', lastName: '', email: '', phone: '', mobile: '', position: '', password: '', repeatPassword: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
    
        if (name === "email" || name === "officialEmail") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setError("Invalid email format");
                return;
            } else {
                setError(""); // Reset error agar sahi format ho
            }
        }
    
        setFormData({ ...formData, [name]: value });
    };
    
    const asianCountries = [
        "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh",
        "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "Georgia",
        "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan",
        "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia",
        "Maldives", "Mongolia", "Myanmar (Burma)", "Nepal", "North Korea",
        "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia",
        "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria",
        "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey",
        "Turkmenistan", "UAE", "Uzbekistan", "Vietnam", "Yemen"
      ];

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
    
        // Basic validation check
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            setError("Please fill all required fields.");
            return;
        }
    
        if (formData.password !== formData.repeatPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setLoading(false);
    
            const data = await res.json();
    
            if (!res.ok) {
                setError(data.error || "Registration failed.");
                return;
            }
    
            alert('Registration successful! Wait for approval.');
            router.push('/login');
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };
    
    

    return (
        <div className="mx-4 mt-10 rounded-lg">
            <h2 className="sm:text-3xl text-xl text-blue-800 text-center font-serif font-bold mb-2"><u>Registeration Form</u></h2>
            <p className="text-md text-center text-gray-400 mb-4">You will get confirmation of your account soon!</p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="grid gap-1">
             
             
                <p className='sm:text-lg text-md font-semibold mt-3'>Office Name</p>
                <input type="text" name="officeName" placeholder="Office Name" required onChange={handleChange} className="border p-2 rounded w-full" />
                <p className='sm:text-lg text-md  font-semibold mt-4'>Official Email</p>
                <input type="email" name="officialEmail" placeholder="Official Email" required onChange={handleChange} className="border p-2 rounded" />
              
   

  <div className='lg:flex flex-cols gap-6'>
                <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Country</p>
                <select name="country"  required onChange={handleChange} className="border p-2 rounded">
                <option value="">Select a country</option>
      {asianCountries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
            
                </select>
                </div>
            
                 
                 <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>City</p>
                <input type="text" name="city" placeholder="Your City" required onChange={handleChange} className="border p-2 rounded" /></div>
                 
                 <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Zip Code</p>
                <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} className="border p-2 rounded" /></div>


                <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Residence Address</p>
                <input type="text" name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded" /></div>
</div>

               

              
                <hr className='my-4'></hr>

                <h1 className='text-xl font-bold font-serif text-blue-700 '><u>Contact Information</u></h1>
                
 <div className='lg:flex gap-6'>
             <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Title</p>
                <select name="title" onChange={handleChange} className="border w-[200px] p-2 rounded">
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                </select></div>

                 <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>First Name</p>
                <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded  w-[300px]" /></div>
                
                <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Last Name</p>
                <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded w-[300px]" /></div>
</div>
               
<div className='lg:flex flex-cols gap-6'>
    <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Position</p>
                <select name="position" onChange={handleChange} className="border p-2 rounded w-[200px]">
                    <option>Select Position</option>
                    <option>CEO</option>
                    <option>Ticketing Executive</option>
                    <option>Visa Consultant</option>
                    <option>Office Boy</option>
                    <option>Director</option>
                    <option>Sales & Marketer</option>

                </select>
               </div>
    <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Phone</p>
                <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} className="border p-2 rounded w-[300px]" /></div>

                <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Mobile No.</p>
                <input type="text" name="mobile" placeholder="Mobile No" onChange={handleChange} className="border p-2 rounded w-[300px]" /></div>

                
</div>



    <div>
 <p className='sm:text-lg text-md  mt-4'><b>Email Address</b> <i className='text-sm'>(It will be your login id)</i></p>
                <input type="email" name="email" placeholder="Login Email" required onChange={handleChange} className="border p-2 rounded w-full" /></div>

<div className='lg:flex gap-6'>
                <div>
                <p className='sm:text-lg text-md   mt-4'><b>Password</b> <i className='text-sm'>(Your account password)</i></p>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password" 
                        required 
                        onChange={handleChange} 
                        className="border p-2 rounded w-full lg:w-[320px]" 
                    />
                    <button 
                        type="button" 
                        className="absolute right-2 top-3 text-gray-600" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                </div></div>

                <div>
                <p className='sm:text-lg text-md  font-semibold mt-4'>Repeat Password</p>
                <div className='relative'>
                <input type={showRepeatPassword ? "text" : "password"} name="repeatPassword"  placeholder="Repeat Password" required onChange={handleChange} className="border p-2 rounded w-full lg:w-[320px] " />
                <button 
                        type="button" 
                        className="absolute right-2 top-3 text-gray-600" 
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        {showRepeatPassword ? "👁️" : "👁️‍🗨️"}
                    </button></div></div>
</div>

                
                <button type="submit" disabled={loading} className={`bg-blue-500 hover:bg-orange-500 my-4 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}>
    {loading ? "Registering..." : "Register"}
</button>
            </form>
        </div>
    );
}
