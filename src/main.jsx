/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import CreateAssignment from './pages/CreateAssignment';
import PrivateRoute from './privateRoute/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Assignments from './pages/Assignments';
import UpdateAssignment from './pages/UpdateAssignment';
import useAxiosSecure from './hook/useAxiosSecure';
import AssignmentDetails from './pages/AssignmentDetails';
import SubmitAssignment from './pages/SubmitAssignment';
import MyAssignment from './pages/MyAssignment';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/assignments',
        element: <Assignments></Assignments>,
        loader: async () => {
          try {
            const response = await useAxiosSecure().get(`/assignmentCount`);
            return response.data;
          } catch (error) {
            console.error('Error loading data:', error);
            throw error;
          }
        },
      },
      {
        path: '/create-assignment',
        element: (
          <PrivateRoute>
            <CreateAssignment></CreateAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: '/update-assignment/:id',
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await useAxiosSecure().get(
              `/assignments/${params.id}`
            );
            return response.data;
          } catch (error) {
            console.error('Error loading data:', error);
            throw error;
          }
        },
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/assignment-details/:id',
        element: (
          <PrivateRoute>
            <AssignmentDetails></AssignmentDetails>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await useAxiosSecure().get(
              `/assignments/${params.id}`
            );
            return response.data;
          } catch (error) {
            console.error('Error loading data:', error);
            throw error;
          }
        },
      },
      {
        path: '/submit-assignments',
        element: (
          <PrivateRoute>
            <SubmitAssignment></SubmitAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-assignment',
        element: (
          <PrivateRoute>
            <MyAssignment></MyAssignment>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster></Toaster>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
