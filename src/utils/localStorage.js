//GETS INFORMATION WITH A SET KEY AND VALUE PAIR IN LOCAL STORAGE DATABASE
export const getDataFromLocalStorage = (key)=>{
    try{
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }catch (error){
        console.error("Error reading from local storage:" , error);
        return null;
    }
};

//SAVES INFORMATION WITH A SPECIFI KEY AND VALUE IN WEB 
export const saveDataToLocalStorage = (key , data)=>{
    try{
        localStorage.setItem(key , JSON.stringify(data));
    }catch(error){
        console.error('Error writing to local Storage:' , error);
    }
};

//DELETES THE STORED INFORMATION FORM THE LOCAL STORAGE DATABASE
export const removeDataFromLocalStorage = (key)=>{
    try{
        localStorage.removeItem(key);
    }catch(error){
        console.error('Error removing form local Storage:' , error);
    }
};

