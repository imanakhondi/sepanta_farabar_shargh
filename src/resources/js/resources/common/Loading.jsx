import { general } from "../constants/strings/fa";

const Loading = () => {
    return ( 
        <span className="p-2 my-3 text-center rounded-lg bg-blue-200 text-blue-500 border border-blue-500">
        {general.loading}
    </span>
     );
}
 
export default Loading;