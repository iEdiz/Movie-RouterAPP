import style from './Button.module.css'

type ButtonProps = {
    text: string;
    form?: string;
    onClick?: () => void;
    type?: HTMLButtonElement['type']
}

export const Button = ({ text, onClick, form, type = 'button' }: ButtonProps) => {
  return (
      <button
      className={`${style.button}`}
      type={type}
      form={form}
      onClick={onClick}
      >
          {text}
      </button>
  )
}
