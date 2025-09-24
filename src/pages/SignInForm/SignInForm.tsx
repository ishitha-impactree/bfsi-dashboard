import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { object, string } from 'yup';
import Button  from '../../components/ui/Button';
import { FormikField } from '../../components/FormikField/FormikField';
import { AuthService } from '../services/AuthService';

export const handleSignInSubmit = async (
  values: { email: string; password: string },
  slug: string,
  {
    setSubmitting,
    validateForm,
    setFieldError,
  }: FormikHelpers<{ email: string; password: string }>,
  navigate: any,
) => {
  validateForm(values);
  setSubmitting(true);
  
  try {
    const res = await AuthService.signIn({
      email: values.email,
      password: values.password,
      slug,
    });

    if (res?.success) {
      toast.success('Signed In');
      navigate('/dashboard'); // Adjust this route as needed
      // You might want to store the token or user data here
    } else {
      setFieldError('email', 'Invalid Email or Password');
    }
  } catch (error) {
    setFieldError('email', 'Accept Invitation / Invalid Email or Password');
  }

  setSubmitting(false);
};

export default function SignInForm({ slug }: Readonly<{ slug: string }>) {
  const navigate = useNavigate();
  const { isMobileOnly } = useDeviceDetection();

  const [hideEyeIcon, setHideEyeIcon] = useState(false);

  const validationSchema = object({
    email: string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      )
      .required('Email address is required'),
    password: string().required('Password is required'),
  });

  const onSubmit = async (
    values: { email: string; password: string },
    formikHelpers: FormikHelpers<{ email: string; password: string }>,
  ) => {
    await handleSignInSubmit(values, slug, formikHelpers, navigate);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          style={isMobileOnly ? { width: '330px' } : { width: '500px' }}
        >
          <div className="text-center mb-4 page-header-container">
            <h5 className="page-title">Login</h5>
            <span className="page-subtitle">Access your account securely</span>
          </div>
          <div className="mt-5">
            <FormikField
              name="email"
              errors={errors}
              validationSchema={validationSchema}
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              rightIcon
            />
          </div>
          <div>
            <FormikField
              name="password"
              errors={errors}
              validationSchema={validationSchema}
              label="Password"
              type={hideEyeIcon ? 'text' : 'password'}
              isPassword
              placeholder="Enter your password"
              passwordIcon={hideEyeIcon}
              setPasswordIcon={setHideEyeIcon}
            />
          </div>
          <Stack direction="horizontal" className="justify-content-end mb-5">
            <a
              href="/forgot_password"
              className="text-decoration-none text-dark fw-400 font-size-15"
            >
              Forgot Password
            </a>
          </Stack>
          <Stack>
            <Button
              text={isSubmitting ? 'Logging in...' : 'Login to account'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              isSolid
              className="w-100 fs-14"
              sufixIconChildren={
                <MdArrowForward
                  size={24}
                  color="var(--icon-color)"
                  className="ms-3"
                />
              }
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}