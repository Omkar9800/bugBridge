// import React, { useState, useContext } from 'react';
// import { UserContext } from "../context/UserContext";
// import axios from 'axios';
// import { USERURL } from '../config';

// const userUrl = USERURL;
// const Profile = () => {
//   const { user, updateUser } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     id: user?.id || '',
//     name: user?.name || '',
//     email: user?.email || '',
//     role: user?.role || '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission (API Call)
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   // Prevent submission if nothing has changed
//   //   if (
//   //     formData.name === user.name &&
//   //     formData.email === user.email
//   //   ) {
//   //     alert("No changes detected.");
//   //     setIsEditing(false);
//   //     return;
//   //   }

//   //   setIsSubmitting(true);

//   //   try {
//   //     const res = await axios.patch(
//   //       `${userUrl}/updateUserDetails`,
//   //       formData,
//   //       {
//   //         // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//   //       }
//   //     );

//   //     updateUser(res.data); // Update context with new user data
//   //     alert('Profile updated successfully!');
//   //     setIsEditing(false);
//   //   } catch (error) {
//   //     console.error('Error updating profile:', error);
//   //     alert(error.response?.data?.message || 'Failed to update profile.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };





//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent submission if nothing has changed
//     if (
//       formData.name === user.name &&
//       formData.email === user.email
//     ) {
//       alert("No changes detected.");
//       setIsEditing(false);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await axios.patch(`${userUrl}/updateUserDetails`, formData);
//       console.log(res.data);
//       updateUser(res.data.data);  // Update context with new user data

//       // If email or other session-related data changed, handle session refresh
//       if (formData.email !== user.email) {
//         // Example: Refresh the session or authentication state
//         localStorage.setItem('user', JSON.stringify(res.data));
//       }

//       alert('Profile updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert(error.response?.data?.message || 'Failed to update profile.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Profile</h2>

//       <form onSubmit={ handleSubmit }>
//         <input type="hidden" name="id" value={ formData.id } />

//         {/* Name Field */ }
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={ formData.name }
//             onChange={ handleChange }
//             disabled={ !isEditing }
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Email Field */ }
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={ formData.email }
//             onChange={ handleChange }
//             disabled={ !isEditing }
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Role Field (Disabled) */ }
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Role</label>
//           <input
//             type="text"
//             name="role"
//             value={ formData.role }
//             disabled
//             className="w-full p-2 border border-gray-300 rounded bg-gray-100"
//           />
//         </div>

//         {/* Edit / Save Buttons */ }
//         { !isEditing ? (
//           <button
//             type="button"
//             onClick={ () => setIsEditing(true) }
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <>
//             <button
//               type="submit"
//               disabled={ isSubmitting }
//               className={ `px-4 py-2 ${isSubmitting ? "bg-gray-400" : "bg-green-500"} text-white rounded mr-2` }
//             >
//               { isSubmitting ? "Saving..." : "Save Changes" }
//             </button>
//             <button
//               type="button"
//               onClick={ () => setIsEditing(false) }
//               className="px-4 py-2 bg-gray-400 text-white rounded"
//             >
//               Cancel
//             </button>
//           </>
//         ) }
//       </form>
//     </div>
//   );
// };

// export default Profile;










import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import { USERURL } from '../config';

const userUrl = USERURL;

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    password: '', // Add password field in the formData
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // For displaying errors
  const [passwordError, setPasswordError] = useState(''); // To handle password-specific error

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (API Call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if nothing has changed
    if (
      formData.name === user.name &&
      formData.email === user.email &&
      formData.password === '' // Check for password change
    ) {
      alert("No changes detected.");
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(''); // Reset error message before submission
    setPasswordError(''); // Reset password error

    try {
      const res = await axios.patch(`${userUrl}/updateUserDetails`, formData);
      console.log(res.data);
      updateUser(res.data.data); // Update context with new user data

      // If email or other session-related data changed, handle session refresh
      if (formData.email !== user.email) {
        localStorage.setItem('user', JSON.stringify(res.data)); // Save updated data in local storage
      }

      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);

      // Handle error messages from the backend response
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to update profile.');
      }

      // Handle password error if the backend returns a specific password-related error
      if (error.response?.data?.message === "Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.") {
        setPasswordError('Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <form onSubmit={ handleSubmit }>
        <input type="hidden" name="id" value={ formData.id } />

        {/* Name Field */ }
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={ formData.name }
            onChange={ handleChange }
            disabled={ !isEditing }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Email Field */ }
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={ formData.email }
            onChange={ handleChange }
            disabled={ !isEditing }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Role Field (Disabled) */ }
        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={ formData.role }
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Password Field (Hidden by default) */ }
        { isEditing && (
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={ formData.password }
              onChange={ handleChange }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a new password"
            />
            { passwordError && (
              <div className="text-red-500 text-sm mt-1">{ passwordError }</div>
            ) }
          </div>
        ) }

        {/* Error Message */ }
        { errorMessage && (
          <div className="text-red-500 text-sm mb-4">{ errorMessage }</div>
        ) }

        {/* Edit / Save Buttons */ }
        { !isEditing ? (
          <button
            type="button"
            onClick={ () => setIsEditing(true) }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              type="submit"
              disabled={ isSubmitting }
              className={ `px-4 py-2 ${isSubmitting ? "bg-gray-400" : "bg-green-500"} text-white rounded mr-2` }
            >
              { isSubmitting ? "Saving..." : "Save Changes" }
            </button>
            <button
              type="button"
              onClick={ () => setIsEditing(false) }
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) }
      </form>
    </div>
  );
};

export default Profile;
