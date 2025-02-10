import { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser,deleteUser } from "./store/userslice";
import { RootState, store } from "./store/store";
import '../src/Admin.css';

const AdminPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true); // If image doesn't load, set error state to true
  };

  const generateInitials = (username: string, lastName: string) => {
    const usernameInitial = username.charAt(0).toUpperCase();
    const lastNameInitial = lastName.charAt(0).toUpperCase();
    return `${usernameInitial}${lastNameInitial}`;
  };

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImageError(false); // Image loaded successfully
      img.onerror = handleImageError; // Image failed to load
    }
  }, [imageUrl]);
  

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    lastName: Yup.string().required("Last name is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Contact must be a number")
      .min(10, "Contact must be at least 10 digits")
      .required("Contact is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId)); // Dispatch delete action with userId
    }
  };

  return (
    <>
      <div>Welcome to the Admin Page</div>
      <br />

      {/* Add User Button */}
      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Add User
      </button>

      {/* User Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add User</h2>
            
            <Formik
              initialValues={{
                username: "",
                lastName: "",
                password: "",
                email: "",
                contact: "",
                gender: "",
                profile:"",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                const newUser = {
                  ...values,
                  id: Date.now().toString(), // Generate a unique ID based on timestamp or use UUID
                };
                dispatch(addUser(newUser)); 
                console.log(store.getState().user);
                setIsModalOpen(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label>Username:</label>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Last Name:</label>
                    <Field type="text" name="lastName" />
                    <ErrorMessage name="lastName" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Password:</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Contact:</label>
                    <Field type="text" name="contact" />
                    <ErrorMessage name="contact" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Gender:</label>
                    <Field as="select" name="gender">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error" />
                  </div>

                  <div className="form-group">
                    <label>Profile</label>
                    <Field type="text" name="profile" />
                    <ErrorMessage name="profile" component="div" className="error" />
                  </div>

               


                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* User Table */}
      <h3>Registered Users</h3>
      {users.length === 0 ? (
        <p>No users added</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Profile</th>
              <th>Edit/Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.gender}</td>
                <td>{user.profile}</td>
                <button className="btn btn-danger">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">
                    Delete
                  </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       
    </>
  );
};

export default AdminPage;
