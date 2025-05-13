import {useState, useEffect} from "react";


function useFetchData(apiEndpoint){
    const [alldata, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect (() => {
        if (initialLoad){
            setInitialLoad(false);
            setLoading(false);
            return;
        }
        setLoading(true);

        const fetchAllData = async () => {
            try{
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAllData(alldata);
                setLoading(false);
            }catch(error){
                setLoading(false);

            }
        }
        if (apiEndpoint){
            fetchAllData()
        }
    }, [initialLoad, apiEndpoint]);

    return {alldata, loading}
}

export default useFetchData;