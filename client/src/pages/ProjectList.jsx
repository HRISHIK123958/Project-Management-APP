// src/pages/ProjectList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500">Members: {project.teamMembers.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
