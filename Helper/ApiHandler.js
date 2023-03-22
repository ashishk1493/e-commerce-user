import { getCookies } from "cookies-next";

const ApiHandler = async (props) => {
  // req: for coockie,
  // res: for coockie,
  // apiType:  api method,
  // body: api body,
  // skipAuth: false,
  // apiUrl: api url

  const { req, res, skipAuth, body, apiType, apiUrl } = props
  let objCookies = getCookies({ req, res });
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  var myHeaders = new Headers();
  if (skipAuth) {
    myHeaders.append("Content-Type", "application/json");
  } else {
    myHeaders.append("x-access-token", objCookies.authToken);
  }

  var requestOptions = apiType == "GET" || apiType == "DELETE" ?
    {
      method: apiType,
      headers: myHeaders,
      redirect: "follow",
    }
    :
    {
      method: apiType,
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    }

  const result = await fetch(`${baseUrl}${apiUrl}`, requestOptions);
  // const res = await api.get(`${baseUrl}staticmetadata`)
  let finalData = await result.json();

  return finalData
}

export default ApiHandler
