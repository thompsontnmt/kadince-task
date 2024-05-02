import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Stack, TextField } from '@mui/material';
import * as Yup from 'yup';
import {  AddActivityDto, UpdateActivityDto } from '../../../generated/api';
import { AxiosServices } from '../../axios/axiosServices';
import { useActivities } from '../../hooks/useActivities';
import { useActivity } from '../../context/ActivityContext';
import { showToastMessage } from '../../utils/showToastMessage';
import { useToast } from '../../hooks/useToast';

const ActivitySchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(2, 'Title must be more than 2 characters').max(50, 'Title must be less than 50 characters')
});

interface Props {
  handleClose: () => any;
  initialValues?: AddActivityDto | UpdateActivityDto;
  activityId?: number;

}

const ActivityForm = ({ handleClose, initialValues, activityId }: Props) => {
  const {toast} = useToast();
  const {filter} = useActivity();
    const {mutate} = useActivities(filter);
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          if (activityId) {
            // Update existing activity
            const body: UpdateActivityDto = {
                title: values.title,
            }
            await AxiosServices.Activity.updateActivity(activityId, body);
          } else {
            // Add new activity
            const body: AddActivityDto = {
                title: values.title
            }
            await AxiosServices.Activity.addActivity(body);
          }
          handleClose();
          mutate();
        } catch (error) {
          showToastMessage(error, toast, activityId ? 'Unable to update item' : 'Unable to add item')
        } finally {
          setSubmitting(false);
        }
      };
    return (
        <Formik
            initialValues={initialValues || { title: '' }}
            validationSchema={ActivitySchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Stack direction={'row'} gap={2} py={2}
                    alignItems={'center'}
                    >
                        <Field as={TextField}
                            name="title"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            autoFocus
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            sx={{ height: activityId ? '50px' : '40px'}}

                        />
                        <Stack direction={'row'} gap={1} pt={1}>
                          <Button type="submit" color="info" variant="contained" disabled={!isValid || !dirty || isSubmitting}>
                              Save
                          </Button>
                          <Button onClick={handleClose} variant='outlined' color="secondary" >
                              Cancel
                          </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default ActivityForm;
