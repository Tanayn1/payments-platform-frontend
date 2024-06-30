const CustomCheckbox = ({ label, checked, onChange } : any) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer my-2">
        <input 
          type="checkbox" 
          className="hidden peer" 
          checked={checked} 
          onChange={onChange} 
        />
        <div className="w-5 h-5 bg-gray-300 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:outline-none">
        {checked && <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          }
        </div>
        <span className="text-sm font-semibold">{label}</span>
      </label>
    );
  };

  export default CustomCheckbox