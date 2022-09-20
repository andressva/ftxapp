import axios from 'axios'

const axiosHttp = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

interface ILoginProps {
    email: string
    password: string
}

export const login = ({ email, password }: ILoginProps) => {
  return new Promise((resolve, reject) => {
    axiosHttp.post('https://demo-api-work-test.herokuapp.com/login', {email, password})
      .then((resp: any) => {
        resolve(resp)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}