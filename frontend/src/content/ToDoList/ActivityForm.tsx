import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Stack, TextField } from '@mui/material';
import * as Yup from 'yup';
import { AxiosServices } from '../../axios/axiosServices';
import { useActivities } from '../../hooks/useActivities';
import { useToast } from '../../hooks/useToast';
import { useActivityById } from '../../hooks/useActivityById';
import { showToastMessage } from '../../utils/showToastMessage';
import { useActivity } from '../../context/ActivityContext';

const ActivitySchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(2, 'Title must be more than 1 character').max(50, 'Title must not exceed 50 characters')
});

interface Props {
  handleClose: () => any;
  activityId?: number;
}

const ActivityForm = ({ handleClose, activityId }: Props) => {
  const {toast} = useToast();
  const {filter, showForm} = useActivity()
  const {updateActivityInCache, addActivityToCache} = useActivities(filter);
  const {data: activity} = useActivityById(activityId);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();  // Manually set focus
    }
  }, [showForm]);
  // Determine the initial values based on whether we are editing or creating
  const initialValues = {
    title: activityId && activity ? activity.title : '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const body = { title: values.title };
      let response;
      if (activityId) {
        response = await AxiosServices.Activity.updateActivity(activityId, body);
        updateActivityInCache(response.data);
      } else {
        response = await AxiosServices.Activity.addActivity(body);
        addActivityToCache(response.data);
        resetForm();
      }
      handleClose();
    } catch (error) {
      showToastMessage(error, toast, 'Unable to create item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={ActivitySchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid, dirty, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
                <Stack direction={'row'} gap={2} py={2} alignItems={'center'}>
                    <Field as={TextField}
                        name="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        autoFocus
                        onFocus={() => setFieldTouched('title', false, false)}
                        inputRef={inputRef}
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <Stack direction={'row'} gap={1} pt={1}>
                        <Button type="submit" color="info" variant="contained" disabled={!isValid || !dirty || isSubmitting}>
                            Save
                        </Button>
                        <Button onClick={handleClose} variant='outlined' color="secondary">
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
