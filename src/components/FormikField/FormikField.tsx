'use client';

import { Field, FormikErrors } from 'formik';
import { FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from 'react-icons/md';
import { object } from 'yup';

interface IFormikFieldProps {
  name: string;
  label?: string;
  type?: string;
  isPassword?: boolean;
  placeholder?: string;
  errors: FormikErrors<any>;
  validationSchema?: ReturnType<typeof object>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  icon?: any;
  rightIcon?: any;
  passwordIcon?: any;
  setPasswordIcon?: any;
  disabled?: boolean;
}

export const FormikField = ({
  name,
  label,
  type,
  isPassword,
  placeholder,
  errors,
  onChange,
  value,
  icon,
  rightIcon,
  passwordIcon,
  setPasswordIcon,
  disabled,
}: IFormikFieldProps) => {
  return (
    <div className="position-relative">
      <FormLabel className="form-label-custom">
        {label}
        {label && <span className="text-danger ms-1">*</span>}
      </FormLabel>
      <InputGroup className="mb-4">
        {icon && <InputGroup.Text>{icon}</InputGroup.Text>}
        <Field
          as={FormControl}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`form-field ${errors[name] ? 'is-invalid' : ''}`}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        {rightIcon && (
          <InputGroup.Text>
            {rightIcon}
          </InputGroup.Text>
        )}
        {isPassword && (
          <InputGroup.Text
            className="cursor-pointer"
            onClick={() => setPasswordIcon((prev: boolean) => !prev)}
          >
            {passwordIcon ? (
              <MdRemoveRedEye size={24} color="var(--icon-color)" />
            ) : (
              <MdOutlineRemoveRedEye size={24} color="var(--icon-color)" />
            )}
          </InputGroup.Text>
        )}
      </InputGroup>
      {errors[name] && (
        <span className="text-danger position-absolute error-span">
          {String(errors[name])}
        </span>
      )}
    </div>
  );
};