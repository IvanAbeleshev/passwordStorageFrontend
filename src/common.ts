import axios, { AxiosError } from 'axios'

interface iOptionRequest{
    statusCode: number,
    authHeader?: boolean,
    token?: string | null | undefined,
    useFormData? : boolean
}

const initialOption:iOptionRequest={
    statusCode: 200,
    authHeader: false,
    token: '',
    useFormData: false
}

const defaultRejectFunction=(error:AxiosError)=>{
    alert(`Server error. Status code: ${error.response?.status} - ${error.response?.statusText}`)
}

export const fulfillGetRequest=(queryString:string, resolve: Function, reject: Function = defaultRejectFunction, option:iOptionRequest=initialOption)=>{
    let config:any = {}
    if(option.authHeader){
        config.headers={
            'Authorization': 'Bearer ' + option.token
        }
    }
    
    if(option.useFormData){
        config.headers['Content-Type'] = 'multipart/form-data'   
    }

    axios.get(queryString, config).then(response=>{        
        if(response.status === option.statusCode){
            resolve(response)
        }
    }).catch(error=>{
        if(axios.isAxiosError(error)){
            reject()
        }
    })
}

export const fulfillPostRequest=(queryString:string, resolve: Function, reject: Function = defaultRejectFunction, sendingData:any, option:iOptionRequest=initialOption)=>{
    let config:any = {}
    if(option.authHeader){
        config.headers={
            'Authorization': 'Bearer ' + option.token
        }
    }
    
    if(option.useFormData){
        config.headers['Content-Type'] = 'multipart/form-data'   
    }

    axios.post(queryString, sendingData, config).then(response=>{        
        if(response.status === option.statusCode){
            resolve(response)
        }
    }).catch(error=>{
        if(axios.isAxiosError(error)){
            reject()
        }
    })
}

