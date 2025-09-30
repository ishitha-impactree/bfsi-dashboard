import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Stack, Container, Row, Col, FormCheck } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { object, string, boolean } from 'yup';

// Assuming these paths are correct for your project structure
import Button from '../../components/ui/Button';
import { FormikField } from '../../components/FormikField/FormikField';

// --- TYPE DEFINITIONS & MOCK AUTH LOGIC ---

interface SignInValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Placeholder for the actual authentication function
const yourAuthFunction = async (credentials: { email: string; password: string; slug?: string }) => {
  // Mock success response. Replace with your actual API call.
  // Delay added to simulate network latency for the loading state
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

// Submission handler logic
export const handleSignInSubmit = async (
  values: SignInValues,
  formikHelpers: FormikHelpers<SignInValues>,
  navigate: any,
  slug?: string,
) => {
  const { setSubmitting, validateForm, setFieldError } = formikHelpers;

  validateForm(values);
  setSubmitting(true);

  try {
    const res = await yourAuthFunction({
      email: values.email,
      password: values.password,
      ...(slug && { slug }),
    });

    if (res?.success) {
      toast.success('Signed In');
      navigate('/cockpit'); // Redirect to /cockpit
    } else {
      setFieldError('email', 'Invalid Email or Password');
    }
  } catch (error) {
    setFieldError('email', 'Accept Invitation / Invalid Email or Password');
  }

  setSubmitting(false);
};

// --- LEFT PANEL COMPONENT (Image/Illustration Container) ---

const LeftPanel = () => (
  <Col
    md={6} 
    className="d-flex align-items-center justify-content-center vh-100 p-0"
    style={{
      backgroundColor: '#FFB300',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Rubier Logo (Positioned top-left) */}
    <div
      style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
        {/* Simulating the geometric logo icon */}
        <span style={{
          display: 'inline-block',
          width: '24px',
          height: '24px',
          backgroundColor: 'white',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
          marginRight: '8px'
        }}></span>
        Rubicr
    </div>

    {/* Globe Illustration (Simulated with CSS) */}
    <div
      style={{
        width: '70%',
        paddingTop: '70%',
        position: 'relative',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.1) inset',
        transform: 'scale(1.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}
      className='my-auto'
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Welcome Back
      </div>
    </div>
  </Col>
);


// --- MAIN SIGN-IN FORM PAGE COMPONENT ---

export default function SignInFormPage({ slug }: { slug?: string }) {
  const navigate = useNavigate();
  const [hideEyeIcon, setHideEyeIcon] = useState(false);

  // Validation Schema
  const validationSchema = object({
    email: string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      )
      .required('Email address is required'),
    password: string().required('Password is required'),
    rememberMe: boolean(),
  });

  const onSubmit = async (
    values: SignInValues,
    formikHelpers: FormikHelpers<SignInValues>,
  ) => {
    await handleSignInSubmit(values, formikHelpers, navigate, slug);
  };

  // Initial values
  const initialValues: SignInValues = {
    email: '',
    password: '',
    rememberMe: false
  };


  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0 m-0">

        {/* 1. Left Side: Image/Illustration Panel (Logo/Illustration) */}
        <LeftPanel />

        {/* 2. Right Side: Form Panel (The Form) */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center py-5 p-0"
          style={{ backgroundColor: '#f8fafc' }}
        >
            <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, handleSubmit, isSubmitting, values, setFieldValue }) => (
                  <Form onSubmit={handleSubmit}>

                    {/* Header: Login and subtitle */}
                    <div className="text-left mb-5">
                      <h2 className="fw-bold" style={{ fontSize: '2rem' }}>Login</h2>
                      <span
                        className="page-subtitle"
                        style={{ color: '#FFB300', fontWeight: 500 }}
                      >
                        Access your account securely
                      </span>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                      <label 
                        htmlFor="email" 
                        className="form-label fw-medium"
                        style={{ color: '#333', fontSize: '0.9rem' }}
                      >
                        Email Address
                      </label>
                      <FormikField
                        name="email"
                        errors={errors}
                        label="" // Empty label since we're using custom label above
                        type="email"
                        placeholder="rouanve@leadbank.com"
                        value={values.email}
                        className="w-100"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <label 
                        htmlFor="password" 
                        className="form-label fw-medium"
                        style={{ color: '#333', fontSize: '0.9rem' }}
                      >
                        Password
                      </label>
                      <FormikField
                        name="password"
                        errors={errors}
                        label="" // Empty label since we're using custom label above
                        type={hideEyeIcon ? 'text' : 'password'}
                        isPassword
                        placeholder="••••••"
                        passwordIcon={hideEyeIcon}
                        setPasswordIcon={setHideEyeIcon}
                        value={values.password}
                        className="w-100"
                      />
                    </div>

                    {/* Remember Me and Forgot Password (On the same row, justified) */}
                    <Stack
                      direction="horizontal"
                      className="justify-content-between mb-5 mt-4 align-items-center"
                    >
                      {/* Remember Me Checkbox (LEFT aligned) */}
                       <FormCheck
                        type="checkbox"
                        id="remember-me-checkbox"
                        label="Remember me"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                        style={{ fontSize: '0.9rem', color: '#333' }}
                      />

                      {/* Forgot Password Link (RIGHT aligned) */}
                      <a
                        href="/forgot_password"
                        className="text-decoration-none fw-400"
                        style={{ fontSize: '0.9rem', color: '#333' }}
                      >
                        Forgot Password
                      </a>
                    </Stack>

                    {/* Login Button */}
                    <Stack>
                      <Button
                        text={isSubmitting ? 'Logging in...' : 'Login to account'}
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                        type="submit"
                        isSolid
                        className="w-100 fw-bold border-0"
                        style={{
                          backgroundColor: '#2b3674', // Dark blue button color
                          color: 'white',
                          padding: '12px 15px',
                          fontSize: '1rem',
                          borderRadius: '8px'
                        }}
                        sufixIconChildren={
                          <MdArrowForward
                            size={24}
                            color="white"
                            className="ms-3"
                          />
                        }
                      />
                    </Stack>

                    {/* Create an Account Link (Centered below button) */}
                    <div className="text-center mt-4">
                      <a
                        href="/sign-up"
                        className="text-decoration-none fw-500"
                        style={{
                          color: '#2b3674', // Dark blue link color
                          fontSize: '1rem'
                        }}
                      >
                        Create an Account
                      </a>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
        </Col>
      </Row>
    </Container>
  );
}