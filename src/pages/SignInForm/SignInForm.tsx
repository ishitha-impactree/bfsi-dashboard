import { Form, Formik, FormikHelpers } from 'formik';
import { useState, ReactNode, CSSProperties } from 'react';
import { object, string, boolean } from 'yup';

const ArrowForwardIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ color: 'white', marginLeft: '12px' }}
    >
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61C4.48 7.97 2.72 10 2 12c.72 2 2.48 4.03 4.61 5.39"/><path d="m2 2 20 20"/></svg>
);

interface CustomButtonProps {
    text: string;
    isDisabled: boolean;
    isLoading: boolean;
    type: 'button' | 'submit' | 'reset';
    isSolid: boolean;
    className: string;
    style: CSSProperties;
    sufixIconChildren?: ReactNode;
    onClick?: () => void;
}
const Button: React.FC<CustomButtonProps> = ({ 
    text, 
    isDisabled, 
    isLoading, 
    type, 
    style, 
    sufixIconChildren,
    onClick 
}) => {
    return (
        <button
            type={type}
            disabled={isDisabled || isLoading}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s, opacity 0.2s',
                opacity: isDisabled || isLoading ? 0.7 : 1,
            }}
            onClick={onClick}
        >
            {isLoading ? 'Loading...' : text}
            {!isLoading && sufixIconChildren}
        </button>
    );
};
interface FormikFieldProps {
    name: string;
    errors: { [key: string]: any };
    label: string;
    type: string;
    isPassword?: boolean;
    passwordIcon?: boolean;
    setPasswordIcon?: (value: boolean) => void;
    value: string;
    className: string;
    style: CSSProperties;
    placeholder?: string; 
}

const FormikField: React.FC<FormikFieldProps> = ({
    name,
    errors,
    type,
    isPassword = false,
    passwordIcon,
    setPasswordIcon,
    value,
    style,
    placeholder, 
}) => {
    const isError = errors[name];

    return (
        <div style={{ position: 'relative' }}>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder} 
                onChange={() => {  }}
                className="form-control"
                style={{
                    ...style,
                    border: `1px solid ${isError ? '#dc3545' : '#ccc'}`,
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            />
            {isPassword && setPasswordIcon && (
                <div
                    onClick={() => setPasswordIcon(!passwordIcon)}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#6c757d',
                    }}
                >
                    {passwordIcon ? <EyeOffIcon /> : <EyeIcon />}
                </div>
            )}
            {isError && (
                <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
                    {isError}
                </div>
            )}
        </div>
    );
};

const CustomToast = ({ message, type }: { message: string; type: 'success' | 'error' | null }) => {
    if (!message || !type) return null;
    const bgColor = type === 'success' ? '#4CAF50' : '#F44336';
    const textColor = 'white';

    return (
        <div 
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 20px',
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: '8px',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'opacity 0.3s ease-in-out',
                opacity: 1,
                fontSize: '1rem',
                fontWeight: '600'
            }}
        >
            {message}
        </div>
    );
};

const Stack: React.FC<{ direction?: 'horizontal', className: string, children: ReactNode }> = ({ children }) => (
    <div 
        style={{ 
            display: 'block', 
            alignItems: 'center' 
        }}
    >
        {children}
    </div>
);

const FormCheck: React.FC<{ type: 'checkbox', id: string, label: string, name: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, style: CSSProperties }> = ({ id, label, checked, onChange, style }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <input 
            type="checkbox" 
            id={id} 
            checked={checked} 
            onChange={onChange} 
            style={{ marginRight: '8px' }}
        />
        <label htmlFor={id} style={style}>{label}</label>
    </div>
);

const yourAuthFunction = async (credentials: { email: string; password: string; slug?: string }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

const showToast = (message: string, type: 'success' | 'error', setToast: Function) => {
    setToast({ message, type });
    setTimeout(() => {
        setToast({ message: '', type: null });
    }, 3000);
};

interface SignInValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const handleSignInSubmit = async (
  values: SignInValues,
  formikHelpers: FormikHelpers<SignInValues>,
  setToast: Function,
  slug?: string,
) => {
  const { setSubmitting, validateForm, setFieldError } = formikHelpers;
  setSubmitting(true);

  try {
    const res = await yourAuthFunction({
      email: values.email,
      password: values.password,
      ...(slug && { slug }),
    });

    if (res?.success) {
      showToast('Signed In!', 'success', setToast); 
      window.location.href = '/cockpit'; 
    } else {
      setFieldError('email', 'Invalid Email or Password');
      showToast('Login failed: Invalid Email or Password', 'error', setToast);
    }
  } catch (error) {
    setFieldError('email', 'Accept Invitation / Invalid Email or Password');
    showToast('Login failed: Check invitation or credentials', 'error', setToast);
  }

  setSubmitting(false);
};

const LeftPanel = () => (
    <div
        style={{
            flex: '1 1 50%', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0',
            backgroundColor: '#FFB300', 
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        <div
            style={{
                position: 'absolute',
                top: '40px',
                left: '60px', 
                zIndex: 10,
            }}
        >
            <img 
                src="/images/rubicr-logo-signin.png"
                alt="Rubicr Logo"
                style={{
                    height: '40px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.1))',
                }}
                onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    console.log("Logo failed to load.");
                }}
            />
        </div>

        <div
            style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                padding: '40px 20px',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: '380px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '40px',
                }}
            >
                <img
                    src="/images/login-image2.jpg" 
                    alt="Globe Asset"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }}
                    onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        const fallback = document.createElement('div');
                        Object.assign(fallback.style, {
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            border: '2px solid rgba(255, 255, 255, 0.8)',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: '500'
                        });
                        fallback.innerText = 'Welcome to Rubicr';
                        e.currentTarget.parentElement?.appendChild(fallback);
                    }}
                />
            </div>
            
            <div
                style={{
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '500px',
                }}
            >
                <h2
                    style={{
                        fontSize: '2.2rem',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    Welcome Back
                </h2>
                <p
                    style={{
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        lineHeight: '1.5',
                        margin: 0,
                    }}
                >
                    Sign in to continue your journey with Rubicr and access your personalized dashboard.
                </p>
            </div>
        </div>
    </div>
);

export default function App({ slug }: { slug?: string }) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [hideEyeIcon, setHideEyeIcon] = useState(false);
  
  const [values, setValues] = useState<SignInValues>({
    email: '', 
    password: '', 
    rememberMe: false
  });

  const validationSchema = object({
    email: string(), 
    password: string(), 
    rememberMe: boolean(),
  });

  const onSubmit = async (
    formikValues: SignInValues,
    formikHelpers: FormikHelpers<SignInValues>,
  ) => {
    // Pass setToast function to the submit handler
    await handleSignInSubmit(formikValues, formikHelpers, setToast, slug);
  };


  return (
    <div 
        style={{ 
            minHeight: '100vh', 
            padding: 0, 
            display: 'flex', 
            flexDirection: 'row',
        }}
    >
      <LeftPanel />

      {}
      <CustomToast message={toast.message} type={toast.type} />

      {}
      <div
        style={{
            flex: '1 1 50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0', 
            backgroundColor: '#f7f7f7', 
            minHeight: '100vh', 
        }}
      >
          <div style={{ width: '90%', padding: '16px', maxWidth: '400px' }}>
            <Formik
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ errors, handleSubmit, isSubmitting, setFieldValue, values }) => (
                <form 
                    onSubmit={handleSubmit}
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1rem' 
                    }}
                >
                  <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>Login</h2>
                    <span
                      style={{ color: '#FFB300', fontWeight: 500, fontSize: '1.1rem' }} 
                    >
                      Access your account securely
                    </span>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label 
                      htmlFor="email" 
                      style={{ color: '#333', fontSize: '0.9rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}
                    >
                      Email Address
                    </label>
                    <FormikField
                      name="email"
                      errors={errors}
                      label="" 
                      type="email"
                      value={values.email}
                      placeholder="e.g., john.doe@example.com" 
                      className="w-100"
                      style={{ borderRadius: '6px', padding: '10px 15px' }} 
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="password" 
                      style={{ color: '#333', fontSize: '0.9rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}
                    >
                      Password
                    </label>
                    <FormikField
                      name="password"
                      errors={errors}
                      label="" 
                      type={hideEyeIcon ? 'text' : 'password'}
                      isPassword
                      passwordIcon={hideEyeIcon}
                      setPasswordIcon={setHideEyeIcon}
                      value={values.password}
                      placeholder="••••••••" 
                      className="w-100"
                      style={{ borderRadius: '6px', padding: '10px 15px' }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2.5rem',
                      marginTop: '1rem'
                    }}
                  >
                     <FormCheck
                      type="checkbox"
                      id="remember-me-checkbox"
                      label="Remember me"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                      style={{ fontSize: '0.9rem', color: '#555' }} 
                    />

                    <a
                      href="#/forgot_password"
                      style={{ 
                          textDecoration: 'none', 
                          fontWeight: '400',
                          fontSize: '0.9rem', 
                          color: '#555' 
                      }} 
                    >
                      Forgot Password
                    </a>
                  </div>

                  <Stack>
                    <Button
                      text={isSubmitting ? 'Logging in...' : 'Login to account'}
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                      type="submit"
                      isSolid
                      className="w-100 fw-bold border-0"
                      style={{
                        backgroundColor: '#2b3674', 
                        color: 'white',
                        padding: '12px 15px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: 'none',
                        width: '100%',
                      }}
                      sufixIconChildren={<ArrowForwardIcon />}
                    />
                  </Stack>

                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <a
                      href="#/sign-up"
                      style={{
                        textDecoration: 'none', 
                        fontWeight: '500',
                        color: '#2b3674', 
                        fontSize: '1rem'
                      }}
                    >
                      Create an Account
                    </a>
                  </div>
                </form>
              )}
            </Formik>
          </div>
      </div>
    </div>
  );
}