import api from './index'

export const getAllStudentData = () =>{
    return api.get('/data');
}
export const downloadResume = (id) =>{
    return api.get(`/download/${id}`,{
        responseType: 'blob', 
      });
}