import os

# Define the folder and file names
folder_path = '/pages/attendant/ViewAttendant'
js_file_path = os.path.join(folder_path, 'ViewAttendant.js')
css_file_path = os.path.join(folder_path, 'viewAttendant.css')

# Create the folder
os.makedirs(folder_path, exist_ok=True)

# Create and write to the JavaScript file
js_code = """\
import React from 'react';

const ViewAttendant = () => {
  return (
    <div>ViewAttendant</div>
  );
};

export default ViewAttendant;
"""

with open(js_file_path, 'w') as js_file:
    js_file.write(js_code)

# Create and write to the CSS file
css_code = """\
/* CSS code for ViewAttendant */
"""

with open(css_file_path, 'w') as css_file:
    css_file.write(css_code)

print("Folder 'ViewAttendant' and files created successfully.")
