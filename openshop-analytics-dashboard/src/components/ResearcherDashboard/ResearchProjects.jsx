import React,{useEffect,useState} from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'




export default function ResearchProjects() {
    const [projects, setProjects] = useState([]);
  

    // Fetch research projects
    useEffect(() => {
      fetchProjects();
    }, []);
  
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/research-projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
  
      return (
          <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
              <strong className="text-gray-700 font-medium">Research Projects</strong>
              <div className="border-x border-gray-200 rounded-sm mt-3">
                  <table className="w-full text-gray-700">
                      <thead>
                          <tr>
                              <th>S.no</th>
                              <th>Title</th>
                              <th>Discription</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              
                              <th>Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          
                          {projects && projects.map((request,index) => (
                              
                              <tr key={request._id}>
                                  <td>
                                      {index}
                                  </td>
                                  <td>
                                      {request.title}
                                  </td>
                                  <td>
                                      {request.description}
                                  </td>
                                  <td>{format(new Date(request.startDate), 'dd MMM yyyy')}</td>
                                  <td>{ request.endDate?format(new Date(request.endDate), 'dd MMM yyyy'):"-"}</td>
                                  
                                  <td>{request.status}</td>
                                  
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      );
}
