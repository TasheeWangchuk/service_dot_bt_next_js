// pages/forms/misc-local-services.js
import React from 'react';
import Head from 'next/head';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const categories = [
  "Personal Shopping",
  "Home Organization",
  "Pet Grooming",
  "Sewing/Tailoring",
  "Photography",
];

function MiscLocalServicesForm() {
  return (
    <div className="p-8">
      <Head>
        <title>Service Form - Miscellaneous Local Services</title>
      </Head>
      <h2 className="text-2xl font-semibold mb-4">Miscellaneous Local Services Form</h2>
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

export default MiscLocalServicesForm;
