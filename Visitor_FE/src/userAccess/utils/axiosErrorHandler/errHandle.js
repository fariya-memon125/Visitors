export function ErrHandle(err,history){
    console.log(err.response)
    if(!err.response) return
    if(err.response.status == 401) return  history.push('/login')
    if(err.response.status == 403) return  history.goBack()
}
