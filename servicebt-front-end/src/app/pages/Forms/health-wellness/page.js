// pages/forms/health-wellness.js
import React from 'react';
import Head from 'next/head';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const categories = [
  "Personal Training",
  "Fitness Coaching",
  "Yoga Instruction",
  "Massage Therapy",
  "Meditation Coaching",
  "Health Coaching",
];

function HealthWellnessForm() {
  return (
    <div className="p-8">
      <Head>
        <title>Service Form - Health & Wellness</title>
      </Head>
      <h2 className="text-2xl font-semibold mb-4">Health & Wellness Service Form</h2>
      <form className="space-y-4">
        <TextField fullWidth label="Your Name" variant="outlined" />
        <TextField fullWidth label="Email" variant="outlined" />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            defaultValue=""
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField fullWidth label="Experience" variant="outlined" multiline rows={4} />
        <TextField fullWidth label="Portfolio Link" variant="outlined" />
        <Button variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default HealthWellnessForm;
