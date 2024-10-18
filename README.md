# CWL-GUI

CWL-GUI is an open-source web application designed for the visualization, creation and editing of workflows in the Common Workflow Language (CWL). Built with the React framework, this tool provides an intuitive graphical interface that allows users to manage CWL workflows more efficiently without deep knowledge of the underlying CWL standard. It is designed to help scientists and researchers in fields such as bioinformatics, medical imaging, astronomy, and machine learning, where complex workflows are a necessity.

## Features

- Visualize CWL workflows using an interactive graph
- Create and edit CWL workflows
- Easily add, remove, or modify nodes (steps) in the workflow
- Manage input, output, and other workflow parameters graphically

## Technologies Used

- **Frontend**: React, Redux, Monaco Editor, Font Awesome, Prism.js, React Flow
- **Backend**: Node.js, Express, cwl-ts-auto, JS-YAML

## Prerequisites

- **Node.js** (v14 or later)
- **npm** for package management
- **React** (v18)

## Installation

To install and set up the CWL-GUI application, follow these steps:

```bash

# Step 1 - Clone the repository
git clone https://github.com/alpha-unito/cwl-gui.git
cd cwl-gui

# Step 2 - Install dependencies client
Starting from root folder
cd client
npm install

# Step 3 - Install dependencies server
Starting from root folder
cd server
npm install

# Step 4 - Start server
Starting from root folder
cd server
node index.js

# Step 5 - Start client
Starting from root folder
cd client
npm start

 ``` 

## How to Use

1. **Upload or Create a Workflow**: start by uploading an existing CWL file or create a new workflow from scratch.
2. **Editing the Workflow**: use the interactive graph editor to add, modify, or delete steps in your workflow. Use the code editor to directly modify the CWL file.
3. **Export**: once the changes are made, export the updated CWL file for use in other CWL-supported systems.

## Libraries Required
- **React**: a JavaScript library for building user interfaces
- **Redux**: state management for React
- **Monaco Editor**: code editor used for the CWL text interface
- **React Flow**: provides the interactive graph structure for visualizing CWL workflows
- **Node.js** and Express: server-side technologies to handle CWL file parsing and API calls

## Future Enhancements
- Support for additional CWL file types
- Advanced error handling for CWL file validation
- Performance improvements for handling larger workflows