import os

# Define the folder and file names
folder_name = 'ShowBusiness'
js_file_name = 'ShowBusiness.js'
css_file_name = 'ShowBusiness.css'

# Create the folder
os.makedirs(folder_name, exist_ok=True)

# Create and write to the JavaScript file
js_code = """\
import React from 'react';

const ShowBusiness = () => {
  return (
    <div>ShowBusiness</div>
  );
};

export default ShowBusiness;
"""

js_file_path = os.path.join(folder_name, js_file_name)
with open(js_file_path, 'w') as js_file:
    js_file.write(js_code)

# Create and write to the CSS file
css_code = """\
/* CSS code for ShowBusiness */
"""

css_file_path = os.path.join(folder_name, css_file_name)
with open(css_file_path, 'w') as css_file:
    css_file.write(css_code)

print(f"Folder '{folder_name}' and files created successfully.")
