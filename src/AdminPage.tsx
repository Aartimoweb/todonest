import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser,deleteUser,updateUser } from "./store/userslice";
import { LOGOUT } from "./store/authAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import '../src/Admin.css';

const AdminPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser,setEditingUser] = useState<any | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);
 
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
      dispatch(deleteUser(userId)); 
    }
  };

  const handleEditUser = (user:any) => {
    setEditingUser(user)
    setIsModalOpen(true);
  }

  const handleLogout = () => {
    dispatch({type:LOGOUT})
    navigate('/')
  }

  return (
    <>
       <button onClick={handleLogout} className="btn btn-primary">Logout</button>
       <br></br><br></br>
      <div>Welcome to the Admin Page</div>
      <br />

      {/* Add User Button */}
      <button className="btn btn-primary"  onClick={() => {
       setEditingUser(null); 
       setIsModalOpen(true)}
      }>
        Add User
      </button>

      {/* User Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add User</h2>
            
            <Formik
              initialValues={{
                username: editingUser ? editingUser.username : "",
                lastName: editingUser ? editingUser.lastName : "",
                password: editingUser ? editingUser.password : "",
                email: editingUser ? editingUser.email : "",
                contact: editingUser ? editingUser.contact : "",
                gender: editingUser ? editingUser.gender : "",
                profile: editingUser ? editingUser.profile : "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                if (editingUser) {
                  dispatch(updateUser({ id: editingUser.id, updatedData: values }));
                } else {
                  const newUser = { ...values, id: Date.now().toString() };
                  dispatch(addUser(newUser));
                }
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
                      {editingUser?"update":"submit"}
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
                <button onClick={()=>handleEditUser(user)} className="btn btn-danger">Edit</button>
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
