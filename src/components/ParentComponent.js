import React from 'react';
import SignupForm from './SignupForm'; // Assuming the file path is correct

const ParentComponent = () => {
  const handleSignupSuccess = () => {
    // Redirect to dashboard page
    window.location.href = '/dashboard';
  };

  return (
    <div>
      {/* Render the SignupForm component and pass the handleSignupSuccess function as the onSuccess prop */}
      <SignupForm onSuccess={handleSignupSuccess} />
    </div>
  );
};

export default ParentComponent;
