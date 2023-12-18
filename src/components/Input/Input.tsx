type InputProps = {
  value: string;
  type?: HTMLInputElement['type'];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, type, placeholder, onChange}: InputProps) => {
  return (
    <input 
    placeholder={placeholder} 
    value={value}
    type={type}
    onChange={onChange}
    > 
    </input>
  )
}
