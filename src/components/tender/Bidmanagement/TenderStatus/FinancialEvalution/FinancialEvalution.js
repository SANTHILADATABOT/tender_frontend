import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Select from "react-select";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import LockCard from "../../../../UI/LockCard"
import PreLoader from "../../../../UI/PreLoader";




const FinancialEvalution = () => {

    const { id } = useParams();
    const [FetchLoading, setFetchLoading] = useState(false);
    const { server1: baseUrl } = useBaseUrl();
    const [qualifiedList, setqualifiedList] = useState([]);
    const [input, setInput] = useState({});
    const [unitList, setunitList] = useState([])

    useEffect(() => {
        getTechnicalEvalutionList();
        getUnitList()
    }, [])

    const getTechnicalEvalutionList = () => {
        axios.get(`${baseUrl}/api/technicalevalution/qualifiedlist`).then((resp) => {
            if (resp.status === 200) {
                setqualifiedList(resp.data.qualifiedList)
            }
        })
    }

    const getUnitList = () => {
        axios.get(`${baseUrl}/api/unitmasters/getUnitList`).then((resp) => {
            // console.log(resp.data)
           if(resp.status === 200){
            setunitList(resp.data.unitList)
           }
        })
    }

    const unitChangeHandler = (selectedOptions, techsubid) => {

        setInput((prev) => {
            return {
                ...prev,
                [techsubid] : {
                    ...prev.techsubid,
                    unit : selectedOptions.value
                },
            }
        })

    }

    const unit_name = [
        {value : '1', label : 'Cubic Metric Ton'}
    ]

    console.log(input);
    console.log(input[3]?.unit);

    

    return (
        <LockCard locked={!id}>
            <PreLoader loading={FetchLoading}>
                {qualifiedList.map((item) => {
                    return (
                        <div className="row mt-2 d-flex align-items-center mb-2" key={item.id}>
                            <div className="col-md-3">{item.compName}</div>
                            <div className="col-md-3">
                                <Select
                                    name={"unit"+item.id}
                                    id={"unit"+item.id}
                                    isSearchable="true"
                                    isClearable="true"
                                    options={unitList}
                                    onChange={(selectedOptions) => {
                                        unitChangeHandler(selectedOptions, item.id);
                                    }}
                                    value={input[item.id]?.unit ? unitList.find((x) => x.value === input[item.id]?.unit ) : null }
                                    // isLoading={StateOptions.isLoading}
                                    // isDisabled={id ? true : false}
                                ></Select>
                            </div>
                            <div className="col-md-3">
                                
                            </div>
                            <div className="col-md-3">hjgjhjhkjhkhkj</div>
                        </div>
                    );
                })}


            </PreLoader>
        </LockCard>
    )
}

export default FinancialEvalution

