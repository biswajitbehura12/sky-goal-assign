const asyncPostCall = async (path,headersBody) => {
 
    try {
        const response = await fetch(`http://localhost:8087${path}`, headersBody);
         const data = await response.json();
         return data;
       } catch(error) {
          console.log(error)
         } 
    }
    
    export default asyncPostCall;