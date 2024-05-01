import React from 'react';
import { useActivities } from '../../hooks/useActivities';
import { AddActivityDto } from '../../../generated/api';
import { AxiosServices } from '../../axios/axiosServices';
import { Formik, Form, Field } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import * as Yup from 'yup';

interface Props {
  handleClose: () => void;
}

const ActivityForm = ({handleClose}: Props) => {
  const { mutate } = useActivities();
  const ActivitySchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters long'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters long')
  });
  return (
    <Box p={3}>
      <Formik
        initialValues={{
          title: '',
          description: ''
        }}
       validationSchema={ActivitySchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const body: AddActivityDto = {
              title: values.title,
              description: values.description
            };
            await AxiosServices.Activity.addActivity(body);
            mutate();
            handleClose();
          } catch (error) {
            console.error("Error adding activity:", error);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Field as={TextField}
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <Field as={TextField}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
              Add Activity
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ActivityForm;
